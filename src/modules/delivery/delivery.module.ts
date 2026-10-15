import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { PaymentModule } from '../payment/payment.module';
import { ShipbubbleModule } from '../shipbubble/shipbubble.module';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';

@Module({
  imports: [PrismaModule, PaymentModule, ShipbubbleModule],
  controllers: [DeliveryController],
  providers: [DeliveryService],
  exports: [DeliveryService],
})
export class DeliveryModule {}
