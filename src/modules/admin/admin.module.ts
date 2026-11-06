import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaModule } from 'prisma/prisma.module';
import { DeliveryModule } from '../delivery/delivery.module';
import { CreditModule } from '../credits/credit.module';
import { WhatsappModule } from '../whatsapp/whatsapp.module';
import { AiDeliveryModule } from '../ai-delivery/ai-delivery.module';
import { AutomationModule } from '../automation/automation.module';

@Module({
  imports: [ConfigModule, PrismaModule, DeliveryModule, CreditModule, WhatsappModule, AiDeliveryModule, AutomationModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
