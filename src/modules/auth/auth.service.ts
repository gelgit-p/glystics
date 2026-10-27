import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignupInput } from './dto/signup.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from './email/email.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponse } from './dto/auth-response.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private emailService: EmailService,
  ) {}

  async signup(data: SignupInput): Promise<void> {
    const existingUser = await this.userService.findByEmail(data.email);
    if (existingUser) {
      if (existingUser.emailConfirmed) {
        throw new BadRequestException('User already exists');
      } else {
        const token = this.jwt.sign(
          { email: existingUser.email },
          { secret: process.env.EMAIL_CONFIRM_SECRET, expiresIn: '1h' },
        );
        const confirmLink = `${process.env.FRONTEND_LINK}/confirm-email?token=${token}`;
        await this.userService.update(existingUser.id, {
          emailConfirmToken: token,
        });

        await this.emailService.sendConfirmationEmail(
          existingUser.email,
          confirmLink,
        );
        return;
      }
    }

    const hash = await bcrypt.hash(data.password, 10);

    const token = this.jwt.sign(
      { email: data.email },
      { secret: process.env.EMAIL_CONFIRM_SECRET, expiresIn: '1h' },
    );

    const user = await this.userService.create({
      email: data.email,
      password: hash,
      emailConfirmToken: token,
       emailConfirmed: true,
       businessName: data.businessName,
       fullName: data.fullName
    });

    // const confirmLink = `${process.env.FRONTEND_LINK}/confirm-email?token=${token}`;

    // await this.emailService.sendConfirmationEmail(user.email, confirmLink);
  }

  // async confirmEmail(token: string): Promise<boolean> {
  //   try {
  //     const payload = this.jwt.verify(token, {
  //       secret: process.env.EMAIL_CONFIRM_SECRET,
  //     });
  //     const user = await this.userService.findByEmail(payload.email);
  //     if (!user) throw new BadRequestException('User not found');

  //     if (user.emailConfirmToken !== token) {
  //       throw new BadRequestException('Invalid or outdated token');
  //     }

  //     await this.userService.update(user.id, {
  //       emailConfirmed: true,
  //       emailConfirmToken: null,
  //     });
  //     return true;
  //   } catch {
  //     throw new BadRequestException('Invalid or expired token');
  //   }
  // }

  async login(data: LoginDto): Promise<AuthResponse> {
    const email = typeof data?.email === 'string' ? data.email.trim().toLowerCase() : '';
    const password = typeof data?.password === 'string' ? data.password : '';
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!user.emailConfirmed) {
      throw new BadRequestException('Email is not confirmed');
    }

    const accessToken = this.jwt.sign(
      { sub: user.id, email: user.email },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      },
    );

    const refreshToken = this.jwt.sign(
      { sub: user.id, email: user.email },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    );

    const hashedRefresh = await bcrypt.hash(refreshToken, 10);

    await this.userService.update(user.id, {
      hashedRefresh,
    });
    const safeUser = await this.userService.findById(user.id);
    if (!safeUser) {
      throw new BadRequestException('User not found');
    }
    return {
      accessToken,
      refreshToken,
      user: safeUser,
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    try {
      const payload = this.jwt.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.userService.findByEmail(payload.email);
      if (!user) throw new BadRequestException('User not found');

      if (!user.hashedRefresh) {
        throw new BadRequestException('No refresh token stored');
      }

      const isMatch = await bcrypt.compare(refreshToken, user.hashedRefresh);
      if (!isMatch) {
        throw new BadRequestException('Refresh token does not match');
      }

      const newAccessToken = this.jwt.sign(
        { sub: user.id, email: user.email },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '15m',
        },
      );

      const newRefreshToken = this.jwt.sign(
        { sub: user.id, email: user.email },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      );

      const newHashedRefresh = await bcrypt.hash(newRefreshToken, 10);

      await this.userService.update(user.id, {
        hashedRefresh: newHashedRefresh,
      });

      const safeUser = await this.userService.findById(user.id);
      if (!safeUser) {
        throw new BadRequestException('User not found');
      }
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: safeUser,
      };
    } catch {
      throw new BadRequestException('Invalid or expired refresh token');
    }
  }

  async logout(userId: string): Promise<boolean> {
    await this.userService.update(userId, { hashedRefresh: null });
    return true;
  }
}
