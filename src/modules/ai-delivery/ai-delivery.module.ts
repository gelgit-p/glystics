import { Module } from '@nestjs/common';
import { AiAgentModule } from '../ai-agent/ai-agent.module';
import { WhatsappModule } from '../whatsapp/whatsapp.module';
import { ShipbubbleModule } from '../shipbubble/shipbubble.module';
import { DeliveryModule } from '../delivery/delivery.module';
import { AiDeliveryController } from './ai-delivery.controller';
import { AiDeliveryService } from './ai-delivery.service';

@Module({
  imports: [AiAgentModule, WhatsappModule, ShipbubbleModule, DeliveryModule],
  controllers: [AiDeliveryController],
  providers: [AiDeliveryService],
  exports: [AiDeliveryService],
})
export class AiDeliveryModule {}
