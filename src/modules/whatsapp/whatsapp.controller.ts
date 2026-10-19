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
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import {
  WhatsappMediaFile,
  WhatsappService,
} from './whatsapp.service';
import { AccessTokenDto, LongLivedTokenDto, MessageDto, WebhookSubscriptionDto } from './dto/whatsapp.dto';
import { CreateMessageTemplateDto } from './dto/create-message-template.dto';
import { SendUtilityMessageDto } from './dto/send-utility-message.dto';
import { SendOrderConfirmationDto } from './dto/send-order-confirmation.dto';
import { TokenDto } from './dto/token.dto';

@Controller('whatsapp')
export class WhatsappController {
  constructor(
    private readonly whatsappService: WhatsappService,
    private readonly configService: ConfigService,
  ) { }

  @Get('access-token')
  @UseGuards(AuthGuard('jwt'))
  async getAccessToken(@Query() dto: AccessTokenDto): Promise<string> {
    return await this.whatsappService.getAccessToken(dto);
  }

  /**
   * Endpoint to send an outbound text message
   * POST http://localhost:3000/whatsapp/send
   */
  @Post('send')
  @UseGuards(AuthGuard('jwt'))
  async sendMessage(
    @Req() request: Request & { user: { id: string } },
    @Body() dto: MessageDto,
  ) {
    return await this.whatsappService.sendMessage(dto, request.user.id);
  }

  @Post('media')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedia(
    @Req() request: Request & { user: { id: string } },
    @Body('phoneNumberId') phoneNumberId: string,
    @UploadedFile() file: WhatsappMediaFile,
  ) {
    return await this.whatsappService.uploadMedia(
      request.user.id,
      phoneNumberId,
      file,
    );
  }

  @Post('long-lived-token')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getLongLivedToken(
    @Req() request: Request & { user: { id: string } },
    @Body() dto: LongLivedTokenDto,
  ): Promise<any> {
    return await this.whatsappService.getLongLivedToken(
      dto.accessToken,
      request.user.id,
      dto.appId,
      dto.appSecret,
    );
  }



  @Post('message-templates')
  @UseGuards(AuthGuard('jwt'))
  async createMessageTemplate(
    @Req() request: Request & { user: { id: string } },
    @Body() dto: CreateMessageTemplateDto,
  ) {
    return await this.whatsappService.createMessageTemplate(
      dto,
      request.user.id,
    );
  }

  @Get('message-templates/:userId')
  @UseGuards(AuthGuard('jwt'))
  async getMessageTemplates(
    @Req() request: Request & { user: { id: string } },
    @Query('status') status: string,
  ) {
    return await this.whatsappService.getMessageTemplates(request.user.id, status);
  }

  @Get('message-templates/:userId/all')
  @UseGuards(AuthGuard('jwt'))
  async getAllMessageTemplates(
    @Req() request: Request & { user: { id: string } },
  ) {
    return await this.whatsappService.getAllMessageTemplates(request.user.id);
  }

  @Get('message-templates/:templateId/status')
  @UseGuards(AuthGuard('jwt'))
  async getMessageTemplateStatus(
    @Req() request: Request & { user: { id: string } },
    @Param('templateId') templateId: string,
  ) {
    return await this.whatsappService.getMessageTemplateStatus(
      templateId,
      request.user.id,
    );
  }

  @Post('send-utility-message')
  @UseGuards(AuthGuard('jwt'))
  async sendUtilityMessage(
    @Req() request: Request & { user: { id: string } },
    @Body() dto: SendUtilityMessageDto,
  ) {
    return await this.whatsappService.sendUtilityMessage({
      ...dto,
      userId: request.user.id,
    });
  }

  @Post('send-order-confirmation')
  @UseGuards(AuthGuard('jwt'))
  async sendOrderConfirmation(
    @Req() request: Request & { user: { id: string } },
    @Body() dto: SendOrderConfirmationDto,
  ) {
    return await this.whatsappService.sendOrderConfirmation({
      ...dto,
      userId: request.user.id,
    });
  }

  @Post('store-token')
  @UseGuards(AuthGuard('jwt'))
  async storeToken(
    @Req() request: Request & { user: { id: string } },
    @Body() dto: TokenDto,
  ) {
    return await this.whatsappService.saveToken({
      ...dto,
      userId: request.user.id,
    });
  }

  @Post('subscribe')
  @UseGuards(AuthGuard('jwt'))
  async subscribeToWebhooks(
    @Req() request: Request & { user: { id: string } },
    @Query() dto: WebhookSubscriptionDto,
  ) {
    return await this.whatsappService.subscribeToWebhooks({
      ...dto,
      userId: request.user.id,
    });
  }

  @Delete('unsubscribe')
  @UseGuards(AuthGuard('jwt'))
  async unsubscribeToWebhooks(
    @Req() request: Request & { user: { id: string } },
    @Query() dto: WebhookSubscriptionDto,
  ) {
    return await this.whatsappService.subscribeToWebhooks({
      ...dto,
      userId: request.user.id,
    });
  }

  @Get('get-subscriptions')
  @UseGuards(AuthGuard('jwt'))
  async getWabaSubscriptions(
    @Req() request: Request & { user: { id: string } },
  ) {
    return await this.whatsappService.getAllWabaSubscriptions(request.user.id);
  }

  @Get('tokens')
  @UseGuards(AuthGuard('jwt'))
  async getTokens(@Req() request: Request & { user: { id: string } }) {
    return await this.whatsappService.getTokens(request.user.id);
  }

  @Get('messaging-limit')
  @UseGuards(AuthGuard('jwt'))
  async getMessagingLimit(
    @Req() request: Request & { user: { id: string } },
  ) {
    return await this.whatsappService.getMessagingLimit(request.user.id);
  }

  @Get('debug-token')
  @UseGuards(AuthGuard('jwt'))
  async debugToken(@Req() request: Request & { user: { id: string } }) {
    return await this.whatsappService.debugToken(request.user.id);
  }

  @Get(':userId/waba')
  @UseGuards(AuthGuard('jwt'))
  async getWaba(@Req() request: Request & { user: { id: string } }) {
    return this.whatsappService.getWabaAssignerToUserId(request.user.id);
  }


    @Get(':phoneNumberId/settings')
    @UseGuards(AuthGuard('jwt'))
    async getPhoneSettings(
      @Req() request: Request & { user: { id: string } },
      @Param('phoneNumberId') phoneNumberId: string,
    ) {
      return this.whatsappService.getSettings(phoneNumberId, request.user.id);
    }


  @Put('tokens/:id')
  @UseGuards(AuthGuard('jwt'))
  async editTokenById(
    @Req() request: Request & { user: { id: string } },
    @Param('id') id: string,
    @Body() dto: TokenDto,
  ) {
    return await this.whatsappService.editTokenById(
      id,
      request.user.id,
      dto,
    );
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
  async handleWebhook(@Body() body: any, @Res() res: Response) {
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
            for (const statusUpdate of value.statuses) {
              if (
                typeof statusUpdate.id === 'string' &&
                typeof statusUpdate.status === 'string'
              ) {
                await this.whatsappService.updateMessageDeliveryStatus(
                  statusUpdate.id,
                  statusUpdate.status,
                );
                console.log(`Message status update: ID ${statusUpdate.id} is now ${statusUpdate.status}`);
              }
            }
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
