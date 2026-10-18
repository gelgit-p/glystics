import { BadRequestException } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { PrismaService } from 'prisma/prisma.service';
import type { BachsService } from '../payment/payment.service';
import { CreditsService } from './credit.service';

jest.mock('@nestjs/config', () => ({
  ConfigService: class ConfigService {},
}));

describe('CreditsService', () => {
  const purchase = {
    id: 'purchase-id',
    walletId: 'wallet-id',
    paymentReference: 'CR-reference',
    amountKobo: 50000,
    checkoutSessionId: 'checkout-id',
    status: 'PENDING',
  };

  function createService() {
    const prisma = {
      creditPurchase: {
        findFirst: jest.fn().mockResolvedValue(purchase),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        findUniqueOrThrow: jest.fn().mockResolvedValue({
          ...purchase,
          status: 'FAILED',
        }),
      },
      $transaction: jest.fn(),
    } as unknown as PrismaService;
    const bachsService = {
      getCheckoutSessionById: jest.fn(),
    } as unknown as BachsService;
    const configService = {
      get: jest.fn(),
    } as unknown as ConfigService;

    return {
      service: new CreditsService(prisma, bachsService, configService),
      prisma,
      bachsService,
    };
  }

  it('does not credit a purchase when the provider reference differs', async () => {
    const { service, prisma, bachsService } = createService();
    jest.spyOn(bachsService, 'getCheckoutSessionById').mockResolvedValue({
      status: 'paid',
      reference: 'CR-someone-else',
      currency: 'NGN',
      amount: '500.00',
      checkout_id: 'checkout-id',
    });

    await expect(
      service.verifyPurchase('user-id', purchase.paymentReference),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it('does not credit a purchase when the provider amount differs', async () => {
    const { service, prisma, bachsService } = createService();
    jest.spyOn(bachsService, 'getCheckoutSessionById').mockResolvedValue({
      status: 'paid',
      reference: purchase.paymentReference,
      currency: 'NGN',
      amount: '499.99',
      checkout_id: 'checkout-id',
    });

    await expect(
      service.verifyPurchase('user-id', purchase.paymentReference),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it('returns a pending state while Bachs has not completed payment', async () => {
    const { service, prisma, bachsService } = createService();
    jest.spyOn(bachsService, 'getCheckoutSessionById').mockResolvedValue({
      status: 'pending',
    });

    await expect(
      service.verifyPurchase('user-id', purchase.paymentReference),
    ).resolves.toMatchObject({
      status: 'PENDING',
      credited: false,
    });
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it('returns a failed state when Bachs reports a failed checkout', async () => {
    const { service, prisma, bachsService } = createService();
    jest.spyOn(bachsService, 'getCheckoutSessionById').mockResolvedValue({
      status: 'failed',
    });

    await expect(
      service.verifyPurchase('user-id', purchase.paymentReference),
    ).resolves.toMatchObject({
      status: 'FAILED',
      credited: false,
    });
    expect(prisma.creditPurchase.updateMany).toHaveBeenCalledWith({
      where: { id: purchase.id, status: 'PENDING' },
      data: { status: 'FAILED' },
    });
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it('adds one point per purchased credit only after payment is verified', async () => {
    const { service, prisma, bachsService } = createService();
    const purchaseWithCredits = {
      ...purchase,
      credits: 50,
      bonusCredits: 10,
    };
    jest
      .spyOn(prisma.creditPurchase, 'findFirst')
      .mockResolvedValue(purchaseWithCredits as never);
    jest.spyOn(bachsService, 'getCheckoutSessionById').mockResolvedValue({
      status: 'paid',
      reference: purchase.paymentReference,
      currency: 'NGN',
      amount: '500.00',
      checkout_id: purchase.checkoutSessionId,
    });

    const updateWallet = jest.fn().mockResolvedValue({
      id: purchase.walletId,
      balance: 60,
      points: 50,
    });
    const transaction = {
      creditPurchase: {
        findUniqueOrThrow: jest
          .fn()
          .mockResolvedValueOnce(purchaseWithCredits)
          .mockResolvedValue({ ...purchaseWithCredits, status: 'PAID' }),
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      creditWallet: { update: updateWallet },
      creditTransaction: { create: jest.fn().mockResolvedValue({}) },
    };
    (prisma.$transaction as jest.Mock).mockImplementation(
      (callback: (tx: unknown) => Promise<unknown>) =>
        callback(transaction),
    );

    await expect(
      service.verifyPurchase('user-id', purchase.paymentReference),
    ).resolves.toMatchObject({ status: 'PAID', credited: true });
    expect(updateWallet).toHaveBeenCalledWith({
      where: { id: purchase.walletId },
      data: {
        balance: { increment: 60 },
        points: { increment: 50 },
      },
    });
  });

  it('returns the existing usage transaction for a repeated idempotency key', async () => {
    const { service } = createService();
    const existingTransaction = { id: 'usage-id' };
    const tx = {
      creditTransaction: {
        findUnique: jest.fn().mockResolvedValue(existingTransaction),
      },
      creditWallet: {
        upsert: jest.fn(),
      },
    };

    await expect(
      service.spendWithinTransaction(tx as never, {
        userId: 'user-id',
        credits: 1,
        description: 'Delivery creation',
        idempotencyKey: 'delivery:tracking-id',
      }),
    ).resolves.toBe(existingTransaction);
    expect(tx.creditWallet.upsert).not.toHaveBeenCalled();
  });
});
