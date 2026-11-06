jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue('hashed-refresh'),
}));

import { BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

describe('AuthService.login undefined email regression', () => {
  const user = {
    id: 'user-1',
    email: 'ada@example.com',
    password: 'stored-hash',
    emailConfirmed: true,
    hashedRefresh: null,
  };
  const safeUser = { id: 'user-1', email: 'ada@example.com' };

  function makeService(findByEmail = jest.fn().mockResolvedValue(user)) {
    const userService: any = {
      findByEmail,
      update: jest.fn().mockResolvedValue(user),
      findById: jest.fn().mockResolvedValue(safeUser),
    };
    const jwt: any = { sign: jest.fn().mockReturnValue('token') };
    const service = new AuthService(userService, jwt, {} as any);
    return { service, userService, findByEmail };
  }

  it('rejects missing email with 400 instead of calling Prisma with undefined', async () => {
    const { service, findByEmail } = makeService();
    await expect(service.login({ email: undefined as any, password: 'secret' })).rejects.toBeInstanceOf(BadRequestException);
    expect(findByEmail).not.toHaveBeenCalled();
  });

  it('rejects missing password with 400', async () => {
    const { service, findByEmail } = makeService();
    await expect(service.login({ email: 'ada@example.com', password: '' })).rejects.toBeInstanceOf(BadRequestException);
    expect(findByEmail).not.toHaveBeenCalled();
  });

  it('trims and lowercases email before lookup', async () => {
    const { service, findByEmail } = makeService();
    const result = await service.login({ email: '  ADA@Example.COM ', password: 'secret' });
    expect(findByEmail).toHaveBeenCalledWith('ada@example.com');
    expect(result.accessToken).toBe('token');
    expect(result.user).toEqual(safeUser);
  });
});
