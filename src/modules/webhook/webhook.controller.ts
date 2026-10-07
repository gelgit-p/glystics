import {
  createHmac,
  timingSafeEqual,
} from 'node:crypto';

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
  /**
   * WhatsApp webhook verification
   */
  @Get('whatsapp/webhook')
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.challenge') challenge: string,
    @Query('hub.verify_token') token: string,
    @Res() res: Response,
  ) {
    const verifyToken = process.env.WEBHOOK_SECRET;

    console.log(
      '========== WHATSAPP WEBHOOK VERIFICATION ==========',
    );
    console.log('mode:', mode);
    console.log('challenge:', challenge);
    console.log('received token:', token);
    console.log('expected token:', verifyToken);
    console.log(
      'tokens match:',
      token === verifyToken,
    );
    console.log(
      '====================================================',
    );

    if (
      mode === 'subscribe' &&
      token === verifyToken
    ) {
      console.log('WEBHOOK VERIFIED');

      return res.status(200).send(challenge);
    }

    console.log(
      'WEBHOOK VERIFICATION FAILED',
    );

    return res.status(403).send('Forbidden');
  }

  /**
   * WhatsApp webhook receiver
   */
  @Post('whatsapp/webhook')
  receive(
    @Body()
    payload: Record<string, unknown>,
  ) {
    console.log(
      'WhatsApp webhook received:',
      JSON.stringify(payload, null, 2),
    );

    return {
      received: true,
    };
  }

  /**
   * Bachs webhook receiver
   */
  @Post('/webhook/bachs')
  receiveBachs(
    @RawBody() rawBody: Buffer,
    @Headers('x-bachs-timestamp')
    timestampHeader: string,
    @Headers('x-bachs-signature')
    signatureHeader: string,
    @Body()
    payload: Record<string, unknown>,
  ) {
    const secret =
      process.env.BACHS_WEBHOOK_SECRET ??
      process.env.LOCAL_BACHS_WEBHOOK_SECRET;

    if (
      !secret ||
      !this.verifyBachsSignature(
        rawBody,
        secret,
        timestampHeader,
        signatureHeader,
      )
    ) {
      throw new UnauthorizedException(
        'Invalid webhook signature',
      );
    }

    console.log(
      'Bachs webhook received:',
      JSON.stringify(payload, null, 2),
    );

    return {
      received: true,
    };
  }

  /**
   * Shipbubble webhook receiver
   *
   * Shipbubble signs webhook payloads using:
   *
   * HMAC-SHA512(payload, API_KEY)
   *
   * Header:
   * x-ship-signature
   */
  @Post('/webhook/shipbubble')
  receiveShipbubble(
    @RawBody() rawBody: Buffer,
    @Headers('x-ship-signature')
    signatureHeader: string,
    @Body()
    payload: Record<string, unknown>,
  ) {
    const apiKey =
      process.env.SHIPBUBBLE_API_KEY;

    if (!apiKey) {
      console.error(
        'SHIPBUBBLE_API_KEY is not configured',
      );

      throw new UnauthorizedException(
        'Shipbubble webhook is not configured',
      );
    }

    if (
      !this.verifyShipbubbleSignature(
        rawBody,
        apiKey,
        signatureHeader,
      )
    ) {
      console.error(
        'Invalid Shipbubble webhook signature',
      );

      throw new UnauthorizedException(
        'Invalid webhook signature',
      );
    }

    console.log(
      '========== SHIPBUBBLE WEBHOOK ==========',
    );

    console.log(
      'Event:',
      payload.event,
    );

    console.log(
      'Order ID:',
      payload.order_id,
    );

    console.log(
      'Status:',
      payload.status,
    );

    console.log(
      'Payload:',
      JSON.stringify(payload, null, 2),
    );

    console.log(
      '========================================',
    );

    /**
     * Handle different Shipbubble events.
     */
    switch (payload.event) {
      case 'shipment.label.created':
        console.log(
          'Shipment label created:',
          payload.order_id,
        );
        break;

      case 'shipment.status.changed':
        console.log(
          'Shipment status changed:',
          payload.order_id,
          payload.status,
        );
        break;

      case 'shipment.cancelled':
        console.log(
          'Shipment cancelled:',
          payload.order_id,
        );
        break;

      case 'shipment.cod.remitted':
        console.log(
          'COD payment remitted:',
          payload.order_id,
        );
        break;

      case 'shipment.sla.updated':
        console.log(
          'Shipment SLA updated:',
          payload.order_id,
        );
        break;

      case 'shipment.waybill.updated':
        console.log(
          'Shipment waybill updated:',
          payload.order_id,
        );
        break;

      case 'wallet.threshold.alert':
        console.log(
          'Shipbubble wallet threshold alert',
        );
        break;

      case 'wallet.auto_topup.succeeded':
        console.log(
          'Shipbubble wallet auto top-up succeeded',
        );
        break;

      case 'wallet.auto_topup.failed':
        console.log(
          'Shipbubble wallet auto top-up failed',
        );
        break;

      default:
        console.log(
          'Unhandled Shipbubble event:',
          payload.event,
        );
    }

    /**
     * Shipbubble requires HTTP 200 within
     * 15 seconds.
     */
    return {
      received: true,
    };
  }

  /**
   * Verify Bachs webhook signature.
   */
  private verifyBachsSignature(
    rawBody: Buffer,
    secret: string,
    timestampHeader: string,
    signatureHeader: string,
    toleranceSeconds = 300,
  ) {
    const timestamp =
      Number.parseInt(
        timestampHeader,
        10,
      );

    if (
      !Number.isFinite(timestamp) ||
      Math.abs(
        Date.now() / 1000 -
          timestamp,
      ) > toleranceSeconds
    ) {
      return false;
    }

    const expected = createHmac(
      'sha256',
      secret,
    )
      .update(
        `${timestamp}.${rawBody.toString(
          'utf8',
        )}`,
        'utf8',
      )
      .digest('hex');

    return this.safeCompareSignatures(
      expected,
      signatureHeader,
    );
  }

  /**
   * Verify Shipbubble webhook signature.
   *
   * Shipbubble:
   * HMAC-SHA512(raw payload, API_KEY)
   */
  private verifyShipbubbleSignature(
    rawBody: Buffer,
    apiKey: string,
    signatureHeader: string,
  ): boolean {
    if (
      !rawBody ||
      !signatureHeader
    ) {
      return false;
    }

    const expectedSignature =
      createHmac(
        'sha512',
        apiKey,
      )
        .update(rawBody)
        .digest('hex');

    return this.safeCompareSignatures(
      expectedSignature,
      signatureHeader,
    );
  }

  /**
   * Constant-time signature comparison.
   */
  private safeCompareSignatures(
    expected: string,
    received: string,
  ): boolean {
    if (!expected || !received) {
      return false;
    }

    const expectedBuffer =
      Buffer.from(
        expected.trim().toLowerCase(),
        'utf8',
      );

    const receivedBuffer =
      Buffer.from(
        received.trim().toLowerCase(),
        'utf8',
      );

    if (
      expectedBuffer.length !==
      receivedBuffer.length
    ) {
      return false;
    }

    return timingSafeEqual(
      expectedBuffer,
      receivedBuffer,
    );
  }
}