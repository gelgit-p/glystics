import { createHmac, timingSafeEqual } from 'node:crypto';
import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  RawBody,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class WebhookController {
  @Get('whatsapp/webhook')
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.challenge') challenge: string,
    @Query('hub.verify_token') token: string,
    @Res() res: Response,
  ) {
    const verifyToken = process.env.WEBHOOK_SECRET;

    console.log('========== WHATSAPP WEBHOOK VERIFICATION ==========');
    console.log('mode:', mode);
    console.log('challenge:', challenge);
    console.log('received token:', token);
    console.log('expected token:', verifyToken);
    console.log('tokens match:', token === verifyToken);
    console.log('====================================================');

    if (mode === 'subscribe' && token === verifyToken) {
      console.log('WEBHOOK VERIFIED');

      return res.status(200).send(challenge);
    }

    console.log('WEBHOOK VERIFICATION FAILED');

    return res.status(403).send('Forbidden');
  }

  @Post('whatsapp/webhook')
  receive(@Body() payload: Record<string, unknown>) {
    console.log('WhatsApp webhook received:', JSON.stringify(payload, null, 2));

    return {
      received: true,
    };
  }

  @Post('/webhook/bachs')
  receiveBachs(
    @RawBody() rawBody: Buffer,
    @Headers('x-bachs-timestamp') timestampHeader: string,
    @Headers('x-bachs-signature') signatureHeader: string,
    @Body() payload: Record<string, unknown>,
  ) {
    const secret =
      process.env.BACHS_WEBHOOK_SECRET ?? process.env.LOCAL_BACHS_WEBHOOK_SECRET;

    if (
      !secret ||
      !this.verifyBachsSignature(
        rawBody,
        secret,
        timestampHeader,
        signatureHeader,
      )
    ) {
      throw new UnauthorizedException('Invalid webhook signature');
    }

    console.log('Bachs webhook received:', JSON.stringify(payload, null, 2));

    return {
      received: true,
    };
  }

  private verifyBachsSignature(
    rawBody: Buffer,
    secret: string,
    timestampHeader: string,
    signatureHeader: string,
    toleranceSeconds = 300,
  ) {
    const timestamp = Number.parseInt(timestampHeader, 10);

    if (
      !Number.isFinite(timestamp) ||
      Math.abs(Date.now() / 1000 - timestamp) > toleranceSeconds
    ) {
      return false;
    }

    const expected = createHmac('sha256', secret)
      .update(`${timestamp}.${rawBody.toString('utf8')}`, 'utf8')
      .digest('hex');
    const expectedBuffer = Buffer.from(expected, 'utf8');
    const receivedBuffer = Buffer.from(signatureHeader ?? '', 'utf8');

    return (
      expectedBuffer.length === receivedBuffer.length &&
      timingSafeEqual(expectedBuffer, receivedBuffer)
    );
  }
}
