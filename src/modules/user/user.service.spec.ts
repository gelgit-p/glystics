jest.mock('prisma/generated', () => ({ Prisma: {}, PrismaClient: class {} }));
jest.mock('../../../prisma/generated', () => ({ Prisma: {}, PrismaClient: class {} }));

import { UserService } from './user.service';

describe('UserService.findById WhatsApp persistence fields', () => {
  it('returns appId and appSecretConfigured but never the raw appSecret', async () => {
    const prisma: any = {
      user: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'u1',
          email: 'a@b.com',
          appId: '123456',
          appSecret: 'super-secret-value',
          facebookConnectStatus: false,
          selectedWabaId: 'waba-1',
          selectedPhoneNumberId: ['phone-1'],
        }),
      },
    };
    const service = new UserService(prisma);
    const user: any = await service.findById('u1');
    expect(user.appId).toBe('123456');
    expect(user.appSecretConfigured).toBe(true);
    expect(user.appSecret).toBeUndefined();
    expect(JSON.stringify(user)).not.toContain('super-secret-value');
  });
});
