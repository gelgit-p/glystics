import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { PaymentModule } from '../payment/payment.module';
import { CreditController } from './credit.controller';
import { CreditsService } from './credit.service';

@Module({
  imports: [ConfigModule, PrismaModule, PaymentModule],
  controllers: [CreditController],
  providers: [CreditsService],
  exports: [CreditsService],
})
export class CreditModule {}