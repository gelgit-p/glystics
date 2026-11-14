jest.mock('prisma/prisma.service', () => ({ PrismaService: class PrismaService {} }));
import { AdminNotificationsGateway } from './admin-notifications.gateway';

describe('AdminNotificationsGateway', () => {
  it('broadcasts verification.pending only to open admin sockets', () => {
    const gateway = new AdminNotificationsGateway({ verifyAsync: jest.fn() } as never, { user: { findUnique: jest.fn() } } as never);
    const sent: string[] = [];
    const open = { readyState: 1, send: (s: string) => sent.push(s) };
    const closed = { readyState: 3, send: (s: string) => sent.push(`closed:${s}`) };
    (gateway as unknown as { clients: Set<unknown> }).clients.add(open);
    (gateway as unknown as { clients: Set<unknown> }).clients.add(closed);
    gateway.notifyVerificationPending({ type: 'verification.pending', providerId: 'p1', companyName: 'OPAY Logistics', documentName: 'RC123', submittedAt: new Date().toISOString() });
    expect(sent).toHaveLength(1);
    expect(JSON.parse(sent[0])).toMatchObject({ type: 'verification.pending', companyName: 'OPAY Logistics' });
    expect(gateway.clientCount()).toBe(2);
  });
});
