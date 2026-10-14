import { Module } from '@nestjs/common';
import { DeliveryModule } from '../delivery/delivery.module';
import { WebhookController } from './webhook.controller';

@Module({
	imports: [DeliveryModule],
	controllers: [WebhookController],
})
export class WebhookModule {}
