import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupInput, UpdateInput } from './dto/signup.input';
import { UserService } from '../user/user.service';

type AuthenticatedRequest = Request & {
  user: {
    id: string;
  };
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

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
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Post('refresh-token')
  refreshToken(@Body('token') token: string) {
    return this.authService.refreshToken(token);
  }


  @Post('update-user/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Req() request: AuthenticatedRequest,
    @Body() data: UpdateInput,
  ) {
    await this.userService.update(request.user.id, data);
    return this.userService.findById(request.user.id);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  findCurrentUser(@Req() request: AuthenticatedRequest) {
    return this.userService.findById(request.user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findById(@Req() request: AuthenticatedRequest) {
    return this.userService.findById(request.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@Req() request: AuthenticatedRequest) {
    return this.authService.logout(request.user.id);
  }
}