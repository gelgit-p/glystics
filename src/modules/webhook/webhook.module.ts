import { Module } from '@nestjs/common';
import { DeliveryModule } from '../delivery/delivery.module';
import { AutomationModule } from '../automation/automation.module';
import { WebhookController } from './webhook.controller';
import { CreditModule } from '../credits/credit.module';

@Module({
	imports: [DeliveryModule, AutomationModule, CreditModule],
	controllers: [WebhookController],
})
export class WebhookModule {}
