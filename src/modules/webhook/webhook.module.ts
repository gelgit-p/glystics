import { Module } from '@nestjs/common';
import { DeliveryModule } from '../delivery/delivery.module';
import { AutomationModule } from '../automation/automation.module';
import { WebhookController } from './webhook.controller';
import { CreditModule } from '../credits/credit.module';
import { WhatsappModule } from '../whatsapp/whatsapp.module';

@Module({
	imports: [DeliveryModule, AutomationModule, CreditModule, WhatsappModule],
	controllers: [WebhookController],
})
export class WebhookModule {}
