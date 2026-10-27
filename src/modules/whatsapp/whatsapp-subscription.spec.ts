jest.mock('@nestjs/axios', () => ({ HttpService: class {}, HttpModule: class {} }));
jest.mock('@nestjs/config', () => ({ ConfigService: class {} }));
jest.mock('prisma/generated', () => ({ Prisma: {}, PrismaClient: class {} }));
jest.mock('prisma/prisma.service', () => ({ PrismaService: class {} }));
jest.mock('../credits/credit.service', () => ({ CreditsService: class {} }));

import { UnauthorizedException } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { WhatsappService } from './whatsapp.service';

describe('WhatsApp webhook subscription token handling', () => {
  function makeService(httpPost: jest.Mock) {
    const prisma: any = {
      user: {
        findUnique: jest.fn().mockResolvedValue({ selectedWabaId: 'waba-1', selectedFacebookBusinessId: 'biz-1' }),
        update: jest.fn().mockResolvedValue({}),
      },
      token: {
        findUnique: jest.fn().mockResolvedValue({ facebookLongLivedAccessToken: 'long-lived-token' }),
      },
    };
    const http: any = { post: httpPost, get: jest.fn() };
    const log: any = { log: jest.fn().mockResolvedValue({}) };
    const service = new WhatsappService(http, { get: () => 'v25.0' } as any, prisma, {} as any, log);
    return { service, prisma, log };
  }

  it('uses Token.facebookLongLivedAccessToken instead of the short-lived User token', async () => {
    const post = jest.fn().mockReturnValue(of({ data: { success: true } }));
    const { service } = makeService(post);
    await service.subscribeToWebhooks({ userId: 'u1', override_callback_uri: 'https://example.com/whatsapp/webhook', verify_token: 'secret' } as any);
    expect(post).toHaveBeenCalledWith(
      'https://graph.facebook.com/v25.0/waba-1/subscribed_apps',
      { override_callback_uri: 'https://example.com/whatsapp/webhook', verify_token: 'secret' },
      expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'Bearer long-lived-token' }) }),
    );
  });

  it('turns Meta OAuth 190 expired-session errors into an actionable reconnect 401', async () => {
    const metaError = {
      response: {
        data: {
          error: {
            code: 190,
            type: 'OAuthException',
            message: 'Error validating access token: Session has expired on Monday, 26-Oct-26 03:00:00 PDT.',
          },
        },
      },
    };
    const post = jest.fn().mockReturnValue(throwError(() => metaError));
    const { service, prisma, log } = makeService(post);
    const error = await service.subscribeToWebhooks({ userId: 'u1', override_callback_uri: 'https://example.com/whatsapp/webhook', verify_token: 'secret' } as any).catch((e) => e);
    expect(error).toBeInstanceOf(UnauthorizedException);
    expect(error.message).toContain('Reconnect Facebook');
    expect(prisma.user.update).toHaveBeenCalledWith(expect.objectContaining({ data: { webhookStatus: false } }));
    expect(log.log).toHaveBeenCalledWith(expect.objectContaining({ status: 'TOKEN_EXPIRED' }));
  });

  it('uses only Token model token and errors if Token record is missing (no User fallback)', async () => {
    const post = jest.fn();
    const prisma: any = {
      user: { findUnique: jest.fn().mockResolvedValue({ selectedWabaId: 'waba-1', selectedFacebookBusinessId: 'biz-1' }), update: jest.fn() },
      token: { findUnique: jest.fn().mockResolvedValue(null) },
    };
    const http: any = { post, get: jest.fn() };
    const service = new WhatsappService(http, { get: () => 'v25.0' } as any, prisma, {} as any, { log: jest.fn() } as any);
    await expect(service.subscribeToWebhooks({ userId: 'u1', override_callback_uri: 'https://example.com/whatsapp/webhook', verify_token: 'secret' } as any)).rejects.toThrow('No stored Facebook token');
    expect(post).not.toHaveBeenCalled();
  });

  it('retries Business id when WABA id is rejected as unsupported object', async () => {
    const unsupported = { response: { data: { error: { message: "Unsupported post request. Object with ID 'waba-1' does not exist" } } } };
    const post = jest.fn()
      .mockReturnValueOnce(throwError(() => unsupported))
      .mockReturnValueOnce(of({ data: { success: true } }));
    const { service } = makeService(post);
    await expect(service.subscribeToWebhooks({ userId: 'u1', override_callback_uri: 'https://example.com/whatsapp/webhook', verify_token: 'secret' } as any)).resolves.toEqual({ success: true });
    expect(post).toHaveBeenCalledTimes(2);
    expect(post.mock.calls[1][0]).toBe('https://graph.facebook.com/v25.0/biz-1/subscribed_apps');
  });
});
