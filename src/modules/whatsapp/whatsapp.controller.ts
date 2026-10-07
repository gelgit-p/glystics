import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  HttpStatus,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import {
  WhatsappMediaFile,
  WhatsappService,
} from './whatsapp.service';
import { AccessTokenDto, MessageDto, WebhookSubscriptionDto } from './dto/whatsapp.dto';
import { CreateMessageTemplateDto } from './dto/create-message-template.dto';
import { SendUtilityMessageDto } from './dto/send-utility-message.dto';
import { TokenDto } from './dto/token.dto';

@Controller('whatsapp')
export class WhatsappController {
  constructor(
    private readonly whatsappService: WhatsappService,
    private readonly configService: ConfigService,
  ) { }

  @Get('access-token')
  async getAccessToken(@Query() dto: AccessTokenDto): Promise<string> {
    return await this.whatsappService.getAccessToken(dto);
  }

  /**
   * Endpoint to send an outbound text message
   * POST http://localhost:3000/whatsapp/send
   */
  @Post('send')
  async sendMessage(
    @Body() dto: MessageDto,
  ) {
    return await this.whatsappService.sendMessage(dto);
  }

  @Post('media')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedia(
    @Body('phoneNumberId') phoneNumberId: string,
    @UploadedFile() file: WhatsappMediaFile,
  ) {
    return await this.whatsappService.uploadMedia(phoneNumberId, file);
  }

  @Get('long-lived-token')
  async getLongLivedToken(
    @Query('access_token') accessToken: string,
    @Query('user_id') userId: string,
  ): Promise<any> {
    return await this.whatsappService.getLongLivedToken(accessToken, userId);
  }



  @Post('message-templates')
  async createMessageTemplate(@Body() dto: CreateMessageTemplateDto) {
    return await this.whatsappService.createMessageTemplate(dto);
  }

  @Get('message-templates')
  async getMessageTemplates() {
    return await this.whatsappService.getMessageTemplates();
  }

  @Get('message-templates/:templateId/status')
  async getMessageTemplateStatus(@Param('templateId') templateId: string) {
    return await this.whatsappService.getMessageTemplateStatus(templateId);
  }

  @Post('send-utility-message')
  async sendUtilityMessage(@Body() dto: SendUtilityMessageDto) {
    return await this.whatsappService.sendUtilityMessage(dto);
  }

  @Post('store-token')
  async storeToken(@Body() dto: TokenDto) {
    return await this.whatsappService.saveToken(dto);
  }

  @Post('subscribe')
  async subscribeToWebhooks(@Query() dto: WebhookSubscriptionDto) {
    return await this.whatsappService.subscribeToWebhooks(dto);
  }

  @Delete('unsubscribe')
  async unsubscribeToWebhooks(@Query() dto: WebhookSubscriptionDto) {
    return await this.whatsappService.subscribeToWebhooks(dto);
  }

  @Get('get-subscriptions')
  async getWabaSubscriptions(@Query('userId') userId: string) {
    return await this.whatsappService.getAllWabaSubscriptions(userId);
  }

  @Get('tokens')
  async getTokens() {
    return await this.whatsappService.getTokens();
  }

  @Get('messaging-limit')
  async getMessagingLimit() {
    return await this.whatsappService.getMessagingLimit();
  }

  @Get('debug-token')
  async debugToken() {
    return await this.whatsappService.debugToken();
  }

  @Get(':userId/waba')
  async getWaba(@Param('userId') userId: string) {
    return this.whatsappService.getWabaAssignerToUserId(userId);
  }


    @Get(':phoneNumberId/settings')
  async getPhoneSettings(@Param('phoneNumberId') phoneNumberId: string) {
    return this.whatsappService.getSettings(phoneNumberId);
  }


  @Put('tokens/:id')
  async editTokenById(@Param('id') id: string, @Body() dto: TokenDto) {
    return await this.whatsappService.editTokenById(id, dto);
  }

  /**
   * Meta Webhook Verification
   * GET http://localhost:3000/whatsapp/webhook
   */
  @Get('webhook')
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
    @Res() res: Response,
  ) {
    const verifyToken = this.configService.get<string>('WHATSAPP_VERIFY_TOKEN');

    if (mode === 'subscribe' && token === verifyToken) {
      // Meta requires returning the exact challenge string as plain text with a 200 OK status
      return res.status(HttpStatus.OK).send(challenge);
    }

    return res.status(HttpStatus.FORBIDDEN).send('Verification failed');
  }

  /**
   * Receive Event Notifications from WhatsApp (Incoming messages, read receipts, delivery statuses)
   * POST http://localhost:3000/whatsapp/webhook
   */
  @Post('webhook')
  handleWebhook(@Body() body: any, @Res() res: Response) {
    // Check if the payload comes from a WhatsApp event
    if (body.object === 'whatsapp_business_account') {
      const entries = body.entry;

      for (const entry of entries) {
        const changes = entry.changes;
        for (const change of changes) {
          const value = change.value;

          // Check if there are incoming messages
          if (value.messages && value.messages.length > 0) {
            const incomingMessage = value.messages[0];
            const from = incomingMessage.from; // Sender's phone number
            const text = incomingMessage.text?.body; // Message body (if text)

            console.log(`Received message from ${from}: ${text}`);

            // TODO: Process your business logic here (e.g., pass to an event emitter or database)
          }

          // Check if there are status updates (sent, delivered, read)
          if (value.statuses && value.statuses.length > 0) {
            const statusUpdate = value.statuses[0];
            console.log(`Message status update: ID ${statusUpdate.id} is now ${statusUpdate.status}`);
          }
        }
      }

      // Always return a 200 OK to Meta immediately so they don't retry sending the payload
      return res.status(HttpStatus.OK).send('EVENT_RECEIVED');
    }

    // If the event is not from a WhatsApp Business Account
    return res.status(HttpStatus.NOT_FOUND).send();
  }
}
