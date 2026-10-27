import {
  createHmac,
  timingSafeEqual,
} from 'node:crypto';

import {
  Body,
  BadRequestException,
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
import { DeliveryService } from '../delivery/delivery.service';
import { AutomationService } from '../automation/automation.service';
import { CreditsService } from '../credits/credit.service';
import { WhatsappService } from '../whatsapp/whatsapp.service';
import { AiDeliveryService } from '../ai-delivery/ai-delivery.service';

@Controller()
export class WebhookController {
  constructor(
    private readonly deliveryService: DeliveryService,
    private readonly automationService: AutomationService,
    private readonly creditsService: CreditsService,
    private readonly whatsappService: WhatsappService,
    private readonly aiDeliveryService: AiDeliveryService,
  ) {}

  private verifyWhatsappSignature(rawBody: Buffer | undefined, signature?: string): boolean {
    const secret = process.env.WHATSAPP_APP_SECRET;
    if (!secret || !rawBody || !signature?.startsWith('sha256=')) return false;
    const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
    const given = signature.slice('sha256='.length);
    try {
      return given.length === expected.length && timingSafeEqual(Buffer.from(given, 'hex'), Buffer.from(expected, 'hex'));
    } catch { return false; }
  }

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
  async receive(
    @RawBody() rawBody: Buffer,
    @Headers('x-hub-signature-256') signature: string,
    @Body() payload: Record<string, unknown>,
  ) {
    // Fail closed when WHATSAPP_APP_SECRET is configured; log-only in local dev without it.
    if (process.env.WHATSAPP_APP_SECRET && !this.verifyWhatsappSignature(rawBody, signature)) {
      throw new UnauthorizedException('Invalid WhatsApp webhook signature');
    }

    const entries = Array.isArray(payload.entry) ? payload.entry : [];
    for (const entry of entries) {
      if (typeof entry !== 'object' || entry === null) continue;
      const changes = (entry as Record<string, unknown>).changes;
      if (!Array.isArray(changes)) continue;
      for (const change of changes) {
        if (typeof change !== 'object' || change === null) continue;
        const value = (change as Record<string, unknown>).value;
        if (typeof value !== 'object' || value === null) continue;
        const v = value as Record<string, unknown>;

        // Outbound status receipts (existing behaviour)
        const statuses = v.statuses;
        if (Array.isArray(statuses)) {
          for (const update of statuses) {
            if (typeof update !== 'object' || update === null) continue;
            const statusUpdate = update as Record<string, unknown>;
            if (typeof statusUpdate.id === 'string' && typeof statusUpdate.status === 'string') {
              await this.whatsappService.updateMessageDeliveryStatus(statusUpdate.id, statusUpdate.status);
            }
          }
        }

        // Inbound customer messages -> Dispatchly AI (idempotent, async)
        const messages = v.messages;
        if (Array.isArray(messages) && messages.length) {
          const metadata = (typeof v.metadata === 'object' && v.metadata !== null ? v.metadata : {}) as Record<string, unknown>;
          const phoneNumberId = typeof metadata.phone_number_id === 'string' ? metadata.phone_number_id : '';
          const tenant = phoneNumberId ? await this.aiDeliveryService.resolveTenant(phoneNumberId) : null;
          if (!tenant) {
            console.warn(`WhatsApp inbound ignored: no tenant for phone_number_id=${phoneNumberId}`);
            continue;
          }
          for (const m of messages) {
            if (typeof m !== 'object' || m === null) continue;
            const msg = m as Record<string, unknown>;
            if (typeof msg.id !== 'string' || typeof msg.from !== 'string') continue;
            const text = typeof msg.text === 'object' && msg.text !== null ? (msg.text as Record<string, unknown>).body : undefined;
            const conversation = await this.aiDeliveryService.getOrCreateConversation(tenant.id, phoneNumberId, msg.from);
            const saved = await this.aiDeliveryService.recordInbound(conversation.id, msg.id, typeof text === 'string' ? text : undefined, msg);
            if (saved) {
              // Return 200 fast; processing continues async and is recoverable via AiMessage state.
              setImmediate(() => void this.aiDeliveryService.processInboundMessage(saved.id).catch(() => undefined));
            }
          }
        }
      }
    }

    return { received: true };
  }

  /**
   * Bachs webhook receiver
   */
  @Post('/webhook/bachs')
  async receiveBachs(
    @RawBody() rawBody: Buffer,
    @Headers('x-bachs-timestamp')
    timestampHeader: string,
    @Headers('x-bachs-signature')
    signatureHeader: string,
    @Body()
    payload: Record<string, unknown>,
  ) {
    const secret =
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

    if ((payload.event ?? payload.type) === 'checkout.completed') {
      const data =
        typeof payload.data === 'object' && payload.data !== null
          ? (payload.data as Record<string, unknown>)
          : {};
      const nestedData =
        typeof data.object === 'object' && data.object !== null
          ? (data.object as Record<string, unknown>)
          : {};
      const reference = [
        data.reference,
        nestedData.reference,
        payload.reference,
      ].find((value): value is string => typeof value === 'string' && !!value);
      const checkoutId = [
        data.checkout_id,
        data.checkout_session_id,
        data.id,
        nestedData.checkout_id,
        nestedData.id,
        payload.checkout_id,
      ].find((value): value is string => typeof value === 'string' && !!value);

      if (!reference) {
        throw new BadRequestException(
          'Bachs checkout.completed webhook is missing its checkout reference',
        );
      }

      const creditedPurchase = await this.creditsService.processPaymentWebhook(
        reference,
        checkoutId,
      );
      if (creditedPurchase) {
        return { received: true };
      }

      await this.deliveryService.completePaidCheckout(reference, checkoutId);
    }

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
  async receiveShipbubble(
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
        await this.syncDeliveryStatus(payload);
        await this.triggerShipmentAutomation(payload, 'shipment.label.created');
        break;

      case 'shipment.status.changed':
        console.log(
          'Shipment status changed:',
          payload.order_id,
          payload.status,
        );
        await this.syncDeliveryStatus(payload);
        await this.triggerShipmentAutomation(payload, 'shipment.status.changed');
        break;

      case 'shipment.cancelled':
        console.log(
          'Shipment cancelled:',
          payload.order_id,
        );
        await this.syncDeliveryStatus(payload, 'CANCELLED');
        await this.triggerShipmentAutomation(payload, 'shipment.cancelled');
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

  private async syncDeliveryStatus(
    payload: Record<string, unknown>,
    statusOverride?: string,
  ): Promise<void> {
    const status =
      statusOverride ??
      (typeof payload.status === 'string' ? payload.status : '');

    if (!status.trim()) {
      console.error(
        'Cannot update delivery: Shipbubble webhook status is missing',
      );
      return;
    }

    if (typeof payload.order_id !== 'string' || !payload.order_id) {
      console.error(
        'Cannot update delivery: Shipbubble webhook order_id is missing',
      );
      return;
    }

    let packageStatus:
      | Array<{ status: string; datetime: string }>
      | undefined;
    if (payload.package_status !== undefined) {
      if (!Array.isArray(payload.package_status)) {
        console.error(
          'Cannot update delivery: Shipbubble package_status must be an array',
        );
        return;
      }

      packageStatus = [];
      for (const entry of payload.package_status) {
        if (
          typeof entry !== 'object' ||
          entry === null ||
          !('status' in entry) ||
          typeof entry.status !== 'string' ||
          !('datetime' in entry) ||
          typeof entry.datetime !== 'string'
        ) {
          console.error(
            'Cannot update delivery: Shipbubble package_status contains an invalid entry',
          );
          return;
        }

        packageStatus.push({
          status: entry.status,
          datetime: entry.datetime,
        });
      }
    }

    const updatedCount =
      await this.deliveryService.syncShipbubbleStatusByOrderId(
        payload.order_id,
        status,
        packageStatus,
      );

    if (updatedCount === 0) {
      console.warn(
        `No delivery found for Shipbubble order ${payload.order_id}`,
      );
      return;
    }

    console.log(
      `Updated ${updatedCount} delivery record(s) to ${status.toUpperCase()} for Shipbubble order ${payload.order_id}`,
    );
  }

  private async triggerShipmentAutomation(
    payload: Record<string, unknown>,
    eventName:
      | 'shipment.label.created'
      | 'shipment.status.changed'
      | 'shipment.cancelled',
  ): Promise<void> {
    if (typeof payload.order_id !== 'string' || !payload.order_id) {
      console.warn(
        `Cannot run ${eventName} automation: Shipbubble order_id is missing`,
      );
      return;
    }

    await this.automationService.handleShipbubbleEvent({
      orderId: payload.order_id,
      eventName,
      status: typeof payload.status === 'string' ? payload.status : undefined,
    });
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