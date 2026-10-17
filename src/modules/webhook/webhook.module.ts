import { Module } from '@nestjs/common';
import { DeliveryModule } from '../delivery/delivery.module';
import { AutomationModule } from '../automation/automation.module';
import { WebhookController } from './webhook.controller';

@Module({
	imports: [DeliveryModule, AutomationModule],
	controllers: [WebhookController],
})
export class WebhookModule {}
