import { Module } from '@nestjs/common';
import { DeliveryModule } from '../delivery/delivery.module';
import { AutomationModule } from '../automation/automation.module';
import { WebhookController } from './webhook.controller';
import { CreditModule } from '../credits/credit.module';
import { WhatsappModule } from '../whatsapp/whatsapp.module';
import { AiDeliveryModule } from '../ai-delivery/ai-delivery.module';

@Module({
  imports: [
    DeliveryModule,
    AutomationModule,
    CreditModule,
    WhatsappModule,
    AiDeliveryModule,
  ],
  controllers: [WebhookController],
})
export class WebhookModule {}
