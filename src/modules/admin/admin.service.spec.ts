// Runtime Nest ESM deps under Jest (pre-existing pattern).
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }));
jest.mock('@nestjs/axios', () => ({ HttpService: class {} }));
jest.mock('../whatsapp/whatsapp.service', () => ({ WhatsappService: class {} }));
jest.mock('../delivery/delivery.service', () => ({ DeliveryService: class {} }));
jest.mock('../credits/credit.service', () => ({ CreditsService: class {} }));
jest.mock('../ai-delivery/ai-delivery.service', () => ({ AiDeliveryService: class {} }));
jest.mock('../automation/automation.service', () => ({ AutomationService: class {} }));
import { ForbiddenException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PrismaService } from 'prisma/prisma.service';

describe('AdminService guards', () => {
  let service: AdminService;

  beforeEach(() => {
    const prisma = { user: { findUnique: jest.fn() } } as unknown as PrismaService;
    service = new AdminService(
      prisma,
      {} as any,
      {} as any,
      {} as any,
      { audit: jest.fn() } as any,
      {} as any,
      { get: () => undefined } as any,
    );
  });

  it('rejects non-super-admin in assertSuperAdmin', async () => {
    (service as any).prisma.user.findUnique.mockResolvedValue({ role: 'USER' });
    await expect(service.assertSuperAdmin('u1')).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('allows super-admin in assertSuperAdmin', async () => {
    (service as any).prisma.user.findUnique.mockResolvedValue({ role: 'SUPER_ADMIN' });
    await expect(service.assertSuperAdmin('u1')).resolves.toBeUndefined();
  });

  describe('setLogisticsProvider (SUPER_ADMIN only)', () => {
    const wire = (roles: Record<string, string>) => {
      const update = jest.fn(async ({ where, data }: any) => ({ id: where.id, email: 't@x.ng', role: data.role }));
      (service as any).prisma.user = {
        findUnique: jest.fn(async ({ where }: any) => ({ role: roles[where.id] })),
        update,
      };
      return update;
    };

    it('rejects a non-super-admin actor and never touches the target', async () => {
      const update = wire({ actor: 'USER', target: 'USER' });
      await expect(service.setLogisticsProvider('actor', 'target', true)).rejects.toBeInstanceOf(ForbiddenException);
      expect(update).not.toHaveBeenCalled();
    });

    it('rejects a LOGISTICS_PROVIDER actor (providers cannot promote others)', async () => {
      const update = wire({ actor: 'LOGISTICS_PROVIDER', target: 'USER' });
      await expect(service.setLogisticsProvider('actor', 'target', true)).rejects.toBeInstanceOf(ForbiddenException);
      expect(update).not.toHaveBeenCalled();
    });

    it('super-admin promotes USER -> LOGISTICS_PROVIDER and revokes back to USER', async () => {
      const update = wire({ actor: 'SUPER_ADMIN', target: 'USER' });
      await expect(service.setLogisticsProvider('actor', 'target', true)).resolves.toMatchObject({ role: 'LOGISTICS_PROVIDER' });
      expect(update).toHaveBeenCalledWith(expect.objectContaining({ data: { role: 'LOGISTICS_PROVIDER' } }));
      await expect(service.setLogisticsProvider('actor', 'target', false)).resolves.toMatchObject({ role: 'USER' });
    });

    it('refuses to convert a SUPER_ADMIN target', async () => {
      wire({ actor: 'SUPER_ADMIN', target: 'SUPER_ADMIN' });
      await expect(service.setLogisticsProvider('actor', 'target', true)).rejects.toThrow('cannot be logistics providers');
    });
  });

  it('refuses self-demote and self-delete', async () => {
    await expect(service.setRole('a', 'a', 'USER' as any)).rejects.toThrow('cannot demote yourself');
    await expect(service.setSuspended('a', 'a', true)).rejects.toThrow('cannot suspend yourself');
    await expect(service.deleteUser('a', 'a')).rejects.toThrow('own account');
  });
});
