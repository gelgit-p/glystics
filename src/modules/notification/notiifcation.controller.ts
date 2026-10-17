import {
    Get,
  Controller,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotificationService } from './notification.service';


@Controller('notifications')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}


  @Get(':userId')
  async getNotificationsByUserId(@Param('userId') userId: string) {
    return await this.notificationService.getNotificationsByUserId(userId);
  }

}
