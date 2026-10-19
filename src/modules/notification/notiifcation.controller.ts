import {
    Get,
  Controller,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { NotificationService } from './notification.service';


@Controller('notifications')
@UseGuards(AuthGuard('jwt'))
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(['', ':userId'])
  async getNotificationsByUserId(
    @Req() request: Request & { user: { id: string } },
  ) {
    return this.notificationService.getNotificationsByUserId(request.user.id);
  }
}
