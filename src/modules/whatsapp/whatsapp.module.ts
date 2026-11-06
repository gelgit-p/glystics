import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { CreditModule } from '../credits/credit.module';
import { WebhookLogService } from './webhook-log.service';

@Module({
  imports: [HttpModule, ConfigModule, CreditModule],
  controllers: [WhatsappController],
  providers: [WhatsappService, WebhookLogService],
  exports: [WhatsappService, WebhookLogService],
})
export class WhatsappModule {}