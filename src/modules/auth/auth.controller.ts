import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
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
  }f

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


  @Post('update-user/:id')
  updateUser(
    @Param('id') id: string,
    @Body() data: UpdateInput,
  ) {
    return this.userService.update(id, data);
  }

    @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get('by-email')
  findByEmail(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@Req() request: AuthenticatedRequest) {
    return this.authService.logout(request.user.id);
  }
}