import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';
import { Prisma } from 'prisma/generated';
import { PrismaService } from 'prisma/prisma.service';
import { BachsService } from '../payment/payment.service';
import { SpendCreditsDto } from './dto/spend-credits.dto';

interface ConfiguredPackage {
  name: string;
  priceKobo: number;
  credits: number;
  bonusCredits: number;
}

type TransactionClient = Prisma.TransactionClient;

@Injectable()
export class CreditsService {
  private readonly logger = new Logger(CreditsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly bachsService: BachsService,
    private readonly configService: ConfigService,
  ) {}

  async getPackages() {
    await this.syncPackages();
    return this.prisma.creditPackage.findMany({
      where: { isActive: true },
      orderBy: { priceKobo: 'asc' },
      select: {
        id: true,
        name: true,
        priceKobo: true,
        credits: true,
        bonusCredits: true,
      },
    });
  }

  async getWallet(userId: string) {
    const wallet = await this.prisma.creditWallet.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const [user, successfulPurchase, usage] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: userId },
        select: { businessName: true },
      }),
      this.prisma.creditPurchase.findFirst({
        where: { walletId: wallet.id, status: 'PAID' },
        select: { id: true },
      }),
      this.prisma.creditTransaction.aggregate({
        where: {
          walletId: wallet.id,
          type: 'USAGE',
          createdAt: { gte: monthStart },
        },
        _sum: { amount: true },
      }),
    ]);
    const lowBalanceThreshold = this.getLowBalanceThreshold();

    return {
      walletId: wallet.id,
      businessName: user?.businessName ?? '',
      balance: wallet.balance,
      creditsUsedThisMonth: Math.abs(usage._sum.amount ?? 0),
      hasPurchasedCredits: Boolean(successfulPurchase),
      lowBalance: wallet.balance <= lowBalanceThreshold,
      lowBalanceThreshold,
    };
  }

  async getTransactions(userId: string, cursor?: string, limit = 20) {
    const wallet = await this.prisma.creditWallet.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!wallet) {
      return { items: [], nextCursor: null };
    }

    const pageSize = Math.min(Math.max(Math.trunc(limit), 1), 100);
    const entries = await this.prisma.creditTransaction.findMany({
      where: { walletId: wallet.id },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      take: pageSize + 1,
    });
    const hasMore = entries.length > pageSize;
    const items = hasMore ? entries.slice(0, pageSize) : entries;

    return {
      items,
      nextCursor: hasMore ? items[items.length - 1]?.id ?? null : null,
    };
  }

  async createPurchase(userId: string, packageId: string) {
    await this.syncPackages();
    const selectedPackage = await this.prisma.creditPackage.findFirst({
      where: { id: packageId, isActive: true },
    });
    if (!selectedPackage) {
      throw new NotFoundException('Credit package not found');
    }

    const wallet = await this.prisma.creditWallet.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
    const paymentReference = `CR-${randomUUID()}`;
    const purchase = await this.prisma.creditPurchase.create({
      data: {
        walletId: wallet.id,
        packageId: selectedPackage.id,
        amountKobo: selectedPackage.priceKobo,
        credits: selectedPackage.credits,
        bonusCredits: selectedPackage.bonusCredits,
        paymentReference,
      },
    });

    try {
      const checkout = await this.bachsService.createCheckoutSession({
        expires_in_minutes: 60,
        customer_creation: 'if_required',
        save_payment_method: false,
        pricing: {
          currency: 'NGN',
          amount: this.formatNaira(selectedPackage.priceKobo),
          price_type: 'fixed',
        },
        billing_currency: 'NGN',
        reference: paymentReference,
      });
      const checkoutData = this.asRecord(checkout?.data) ?? checkout;
      const checkoutSessionId =
        typeof checkoutData?.checkout_id === 'string'
          ? checkoutData.checkout_id
          : typeof checkoutData?.id === 'string'
            ? checkoutData.id
            : undefined;
      const checkoutUrl =
        typeof checkoutData?.checkout_url === 'string'
          ? checkoutData.checkout_url
          : typeof checkoutData?.url === 'string'
            ? checkoutData.url
            : undefined;
      if (!checkoutSessionId || !checkoutUrl) {
        throw new ServiceUnavailableException(
          'Bachs did not return a checkout session ID and URL',
        );
      }

      const savedPurchase = await this.prisma.creditPurchase.update({
        where: { id: purchase.id },
        data: { checkoutSessionId, checkoutUrl },
      });
      return {
        purchase: savedPurchase,
        checkoutUrl,
        checkoutSessionId,
      };
    } catch (error) {
      await this.prisma.creditPurchase.update({
        where: { id: purchase.id },
        data: { status: 'FAILED' },
      });
      throw error;
    }
  }

  async verifyPurchase(userId: string, paymentReference: string) {
    const purchase = await this.prisma.creditPurchase.findFirst({
      where: {
        paymentReference,
        wallet: { userId },
      },
    });
    if (!purchase) {
      throw new NotFoundException('Credit purchase not found');
    }
    if (purchase.status === 'PAID') {
      return { purchase, credited: false };
    }
    if (purchase.status !== 'PENDING' || !purchase.checkoutSessionId) {
      throw new ConflictException(
        `Credit purchase cannot be verified while ${purchase.status.toLowerCase()}`,
      );
    }

    const session = await this.bachsService.getCheckoutSessionById(
      purchase.checkoutSessionId,
    );
    this.assertVerifiedPayment(session, purchase);
    return this.creditPaidPurchase(purchase.id);
  }

  async processPaymentWebhook(
    paymentReference: string,
    checkoutSessionId?: string,
  ): Promise<boolean> {
    const purchase = await this.prisma.creditPurchase.findUnique({
      where: { paymentReference },
    });
    if (!purchase) {
      return false;
    }
    if (purchase.status === 'PAID') {
      return true;
    }

    const sessionId = checkoutSessionId ?? purchase.checkoutSessionId;
    if (!sessionId || sessionId !== purchase.checkoutSessionId) {
      throw new BadRequestException(
        'Credit purchase webhook checkout session does not match',
      );
    }
    const session = await this.bachsService.getCheckoutSessionById(sessionId);
    this.assertVerifiedPayment(session, purchase);
    await this.creditPaidPurchase(purchase.id);
    return true;
  }

  async spend(userId: string, request: SpendCreditsDto) {
    const credits = this.getServicePrice(request.service);
    const result = await this.prisma.$transaction((tx) =>
      this.spendWithinTransaction(tx, {
        userId,
        credits,
        description:
          request.service === 'DELIVERY'
            ? 'Delivery creation'
            : 'WhatsApp notification',
        idempotencyKey: `api:${request.idempotencyKey}`,
        metadata: { service: request.service },
      }),
    );
    return result;
  }

  async spendWithinTransaction(
    tx: TransactionClient,
    input: {
      userId: string;
      credits: number;
      description: string;
      idempotencyKey: string;
      metadata?: Prisma.InputJsonObject;
    },
  ) {
    if (!Number.isSafeInteger(input.credits) || input.credits <= 0) {
      throw new BadRequestException('Credit cost must be a positive integer');
    }

    const previous = await tx.creditTransaction.findUnique({
      where: { idempotencyKey: input.idempotencyKey },
    });
    if (previous) {
      return previous;
    }

    const wallet = await tx.creditWallet.upsert({
      where: { userId: input.userId },
      create: { userId: input.userId },
      update: {},
    });
    const deduction = await tx.creditWallet.updateMany({
      where: {
        id: wallet.id,
        balance: { gte: input.credits },
      },
      data: { balance: { decrement: input.credits } },
    });
    if (deduction.count !== 1) {
      throw new HttpException(
        {
          message: 'Insufficient credits',
          required: input.credits,
        },
        HttpStatus.PAYMENT_REQUIRED,
      );
    }

    const updatedWallet = await tx.creditWallet.findUniqueOrThrow({
      where: { id: wallet.id },
      select: { balance: true },
    });
    this.warnIfLow(updatedWallet.balance, input.userId);
    return tx.creditTransaction.create({
      data: {
        walletId: wallet.id,
        type: 'USAGE',
        amount: -input.credits,
        balanceAfter: updatedWallet.balance,
        description: input.description,
        idempotencyKey: input.idempotencyKey,
        metadata: input.metadata,
      },
    });
  }

  async refundUsage(
    userId: string,
    usageTransactionId: string,
    description: string,
  ) {
    return this.prisma.$transaction(async (tx) => {
      const usage = await tx.creditTransaction.findFirst({
        where: {
          id: usageTransactionId,
          type: 'USAGE',
          wallet: { userId },
        },
      });
      if (!usage) {
        throw new NotFoundException('Credit usage transaction not found');
      }

      const idempotencyKey = `refund:${usage.id}`;
      const existingRefund = await tx.creditTransaction.findUnique({
        where: { idempotencyKey },
      });
      if (existingRefund) {
        return existingRefund;
      }

      const refundAmount = Math.abs(usage.amount);
      const wallet = await tx.creditWallet.update({
        where: { id: usage.walletId },
        data: { balance: { increment: refundAmount } },
      });
      return tx.creditTransaction.create({
        data: {
          walletId: usage.walletId,
          type: 'REFUND',
          amount: refundAmount,
          balanceAfter: wallet.balance,
          description,
          reference: usage.id,
          idempotencyKey,
          metadata: { refundedTransactionId: usage.id },
        },
      });
    });
  }

  getServicePrice(service: 'DELIVERY' | 'WHATSAPP') {
    const key =
      service === 'DELIVERY'
        ? 'CREDIT_COST_DELIVERY'
        : 'CREDIT_COST_WHATSAPP';
    const configured = this.configService.get<string>(key);
    if (
      !configured &&
      this.configService.get<string>('NODE_ENV') === 'production'
    ) {
      throw new ServiceUnavailableException(`${key} must be configured`);
    }

    const amount = Number(configured ?? '1');
    if (!Number.isSafeInteger(amount) || amount <= 0) {
      throw new ServiceUnavailableException(
        `${key} must be a positive integer`,
      );
    }
    return amount;
  }

  private async creditPaidPurchase(purchaseId: string) {
    return this.prisma.$transaction(async (tx) => {
      const purchase = await tx.creditPurchase.findUniqueOrThrow({
        where: { id: purchaseId },
      });
      if (purchase.status === 'PAID') {
        return { purchase, credited: false };
      }

      const claim = await tx.creditPurchase.updateMany({
        where: { id: purchase.id, status: 'PENDING' },
        data: { status: 'PAID', paidAt: new Date() },
      });
      if (claim.count === 0) {
        const current = await tx.creditPurchase.findUniqueOrThrow({
          where: { id: purchase.id },
        });
        if (current.status === 'PAID') {
          return { purchase: current, credited: false };
        }
        throw new ConflictException(
          `Credit purchase is ${current.status.toLowerCase()}`,
        );
      }

      const totalCredits = purchase.credits + purchase.bonusCredits;
      const wallet = await tx.creditWallet.update({
        where: { id: purchase.walletId },
        data: { balance: { increment: totalCredits } },
      });
      await tx.creditTransaction.create({
        data: {
          walletId: wallet.id,
          type: 'PURCHASE',
          amount: purchase.credits,
          balanceAfter: wallet.balance - purchase.bonusCredits,
          description: `Purchased ${purchase.credits} credits`,
          reference: purchase.paymentReference,
          idempotencyKey: `purchase:${purchase.paymentReference}`,
          metadata: {
            purchaseId: purchase.id,
            packageId: purchase.packageId,
          },
        },
      });
      if (purchase.bonusCredits > 0) {
        await tx.creditTransaction.create({
          data: {
            walletId: wallet.id,
            type: 'BONUS',
            amount: purchase.bonusCredits,
            balanceAfter: wallet.balance,
            description: `Promotional bonus for ${purchase.paymentReference}`,
            idempotencyKey: `bonus:${purchase.paymentReference}`,
            metadata: {
              purchaseId: purchase.id,
              packageId: purchase.packageId,
            },
          },
        });
      }

      return {
        purchase: await tx.creditPurchase.findUniqueOrThrow({
          where: { id: purchase.id },
        }),
        credited: true,
      };
    });
  }

  private assertVerifiedPayment(
    response: unknown,
    purchase: {
      paymentReference: string;
      amountKobo: number;
      checkoutSessionId: string | null;
    },
  ) {
    const record = this.asRecord(response);
    const nested = this.asRecord(record?.data) ?? record;
    const payment = this.asRecord(nested?.object) ?? nested;
    const status =
      typeof payment?.status === 'string'
        ? payment.status.toLowerCase()
        : '';
    if (!['paid', 'succeeded', 'success', 'completed'].includes(status)) {
      throw new BadRequestException(
        'Bachs has not confirmed this credit purchase as paid',
      );
    }

    if (payment?.reference !== purchase.paymentReference) {
      throw new BadRequestException(
        'Bachs payment reference does not match this purchase',
      );
    }

    const pricing = this.asRecord(payment?.pricing);
    const currency = payment?.billing_currency ?? payment?.currency ?? pricing?.currency;
    if (typeof currency !== 'string' || currency.toUpperCase() !== 'NGN') {
      throw new BadRequestException(
        'Bachs payment currency does not match the NGN purchase',
      );
    }

    const rawAmount =
      payment?.amount ?? payment?.total_amount ?? pricing?.amount;
    if (
      typeof rawAmount !== 'string' &&
      typeof rawAmount !== 'number'
    ) {
      throw new BadRequestException(
        'Bachs payment response is missing the paid amount',
      );
    }
    if (this.toKobo(rawAmount) !== purchase.amountKobo) {
      throw new BadRequestException(
        'Bachs paid amount does not match the credit package price',
      );
    }

    const checkoutId =
      typeof payment?.checkout_id === 'string'
        ? payment.checkout_id
        : typeof payment?.id === 'string'
          ? payment.id
          : undefined;
    if (
      checkoutId &&
      purchase.checkoutSessionId &&
      checkoutId !== purchase.checkoutSessionId
    ) {
      throw new BadRequestException(
        'Bachs checkout ID does not match this purchase',
      );
    }
  }

  private async syncPackages() {
    const packages = this.getConfiguredPackages();
    await Promise.all(
      packages.map((item) =>
        this.prisma.creditPackage.upsert({
          where: { name: item.name },
          create: { ...item, isActive: true },
          update: { ...item, isActive: true },
        }),
      ),
    );
    await this.prisma.creditPackage.updateMany({
      where: { name: { notIn: packages.map((item) => item.name) } },
      data: { isActive: false },
    });
  }

  private getConfiguredPackages(): ConfiguredPackage[] {
    const configured = this.configService.get<string>('CREDIT_PACKAGES');
    let parsed: unknown;
    if (configured) {
      try {
        parsed = JSON.parse(configured);
      } catch {
        throw new ServiceUnavailableException(
          'CREDIT_PACKAGES must be valid JSON',
        );
      }
    } else if (this.configService.get<string>('NODE_ENV') !== 'production') {
      parsed = [
        { name: 'Starter', priceNaira: 500, credits: 50, bonusCredits: 0 },
        { name: 'Growth', priceNaira: 2000, credits: 220, bonusCredits: 20 },
        { name: 'Business', priceNaira: 5000, credits: 600, bonusCredits: 100 },
      ];
    } else {
      throw new ServiceUnavailableException(
        'CREDIT_PACKAGES must be configured in production',
      );
    }

    if (!Array.isArray(parsed) || parsed.length === 0) {
      throw new ServiceUnavailableException(
        'CREDIT_PACKAGES must be a non-empty JSON array',
      );
    }
    const names = new Set<string>();
    return parsed.map((value, index) => {
      const item = this.asRecord(value);
      const priceNaira = Number(item?.priceNaira);
      const credits = Number(item?.credits);
      const bonusCredits = Number(item?.bonusCredits ?? 0);
      const name = typeof item?.name === 'string' ? item.name.trim() : '';
      if (
        !name ||
        names.has(name) ||
        !Number.isSafeInteger(priceNaira) ||
        priceNaira <= 0 ||
        !Number.isSafeInteger(credits) ||
        credits <= 0 ||
        !Number.isSafeInteger(bonusCredits) ||
        bonusCredits < 0 ||
        priceNaira > Math.floor(Number.MAX_SAFE_INTEGER / 100)
      ) {
        throw new ServiceUnavailableException(
          `CREDIT_PACKAGES item ${index + 1} is invalid`,
        );
      }
      names.add(name);
      return {
        name,
        priceKobo: priceNaira * 100,
        credits,
        bonusCredits,
      };
    });
  }

  private getLowBalanceThreshold() {
    const threshold = Number(
      this.configService.get<string>('CREDIT_LOW_BALANCE_THRESHOLD') ?? '10',
    );
    if (!Number.isSafeInteger(threshold) || threshold < 0) {
      throw new ServiceUnavailableException(
        'CREDIT_LOW_BALANCE_THRESHOLD must be a non-negative integer',
      );
    }
    return threshold;
  }

  private warnIfLow(balance: number, userId: string) {
    const threshold = this.getLowBalanceThreshold();
    if (balance <= threshold) {
      this.logger.warn(
        `Credit wallet for business account ${userId} is low (${balance} credits remain)`,
      );
    }
  }

  private formatNaira(amountKobo: number) {
    return `${Math.floor(amountKobo / 100)}.${String(amountKobo % 100).padStart(2, '0')}`;
  }

  private toKobo(amount: string | number) {
    const stringAmount = String(amount).trim();
    if (!/^\d+(?:\.\d{1,2})?$/.test(stringAmount)) {
      throw new BadRequestException('Bachs returned an invalid payment amount');
    }
    const [naira, kobo = ''] = stringAmount.split('.');
    return Number(naira) * 100 + Number(kobo.padEnd(2, '0'));
  }

  private asRecord(value: unknown): Record<string, unknown> | undefined {
    return typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : undefined;
  }
}