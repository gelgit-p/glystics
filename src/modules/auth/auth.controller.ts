import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';

type AuthenticatedRequest = Request & {
  user: {
    id: string;
  };
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() data: SignupInput): Promise<boolean> {
    await this.authService.signup(data);
    return true;
  }

//   @Get('confirm-email')
//   confirmEmail(@Query('token') token: string) {
//     return this.authService.confirmEmail(token);
//   }

  @Post('login')
  login(@Body() data: LoginInput) {
    return this.authService.login(data);
  }

  @Post('refresh-token')
  refreshToken(@Body('token') token: string) {
    return this.authService.refreshToken(token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@Req() request: AuthenticatedRequest) {
    return this.authService.logout(request.user.id);
  }
}