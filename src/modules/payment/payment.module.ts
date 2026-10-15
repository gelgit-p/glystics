import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { PaymentController } from './payment.controller';
import { BachsService } from './payment.service';

@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [PaymentController],
  providers: [BachsService],
  exports: [BachsService],
})
export class PaymentModule {}