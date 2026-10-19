import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { PaymentModule } from '../payment/payment.module';
import { ShipbubbleModule } from '../shipbubble/shipbubble.module';
import { NotificationController } from './notiifcation.controller';
import { NotificationService } from './notification.service';


@Module({
  imports: [PrismaModule, PaymentModule, ShipbubbleModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
