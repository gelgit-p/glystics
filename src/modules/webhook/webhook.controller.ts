import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('webhook')
export class WebhookController {
  @Get()
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.challenge') challenge: string,
    @Query('hub.verify_token') token: string,
    @Res() res: Response,
  ) {
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

    if (mode === 'subscribe' && token === verifyToken) {
      console.log('WEBHOOK VERIFIED');

      return res.status(200).send(challenge);
    }

    return res.status(403).send('Forbidden');
  }

  @Post()
  receive(@Body() payload: Record<string, unknown>) {
    console.log(
      'WhatsApp webhook received:',
      JSON.stringify(payload, null, 2),
    );

    return {
      received: true,
    };
  }
}