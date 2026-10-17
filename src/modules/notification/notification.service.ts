import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}


async getNotificationsByUserId(userId: string) {
    try {
      const notifications = await this.prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
      return notifications;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve notifications');
    }
}
}
