import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { LoginDto } from './dto/login.dto';

describe('LoginDto validation', () => {
  it('normalizes a valid login payload', async () => {
    const dto = plainToInstance(LoginDto, { email: '  ADA@Example.COM ', password: 'secret' });
    await expect(validate(dto)).resolves.toEqual([]);
    expect(dto.email).toBe('ada@example.com');
  });

  it('rejects an empty body before it can reach Prisma', async () => {
    const dto = plainToInstance(LoginDto, {});
    const errors = await validate(dto);
    expect(errors.map((e) => e.property)).toEqual(expect.arrayContaining(['email', 'password']));
  });

  it('rejects invalid email', async () => {
    const dto = plainToInstance(LoginDto, { email: 'not-an-email', password: 'secret' });
    const errors = await validate(dto);
    expect(errors.map((e) => e.property)).toContain('email');
  });
});
