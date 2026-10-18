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
