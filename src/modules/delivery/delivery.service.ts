import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'prisma/generated';
import { PrismaService } from 'prisma/prisma.service';
import { BachsService } from '../payment/payment.service';
import { ShipbubbleService } from '../shipbubble/shipbubble.service';
import { BachsCreateCheckoutSessionDto } from '../payment/payment.dto';
import { CreateShipmentDto } from '../shipbubble/dto/create-shipment.dto';
import { CreateDeliveryCheckoutDto } from './dto/create-delivery-checkout.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bachsService: BachsService,
    private readonly shipbubbleService: ShipbubbleService,
  ) {}


  async create(data: UpdateDeliveryDto) {
  const requiredFields = [
    'senderName',
    'userId',
    'senderPhone',
    'senderAddress',
    'receiverName',
    'receiverPhone',
    'receiverAddress',
    'packageName',
    'packageCategory',
    'packageWeight',
    'packageDimensions',
    'packageValue',
    'pickupDate',
    'deliveryType',
  ] as const;

  const missingFields = requiredFields.filter(
    (field) =>
      data[field] === undefined ||
      data[field] === null ||
      data[field] === '',
  );

  if (missingFields.length > 0) {
    throw new BadRequestException(
      `Missing required fields: ${missingFields.join(', ')}`,
    );
  }

  return this.prisma.delivery.create({
    data: {
      ...(data as Prisma.DeliveryCreateInput),
      deliveryStatus: data.deliveryStatus ?? 'CREATED',
      trackingId: `SD${Math.floor(10000 + Math.random() * 90000)}`,
      paymentStatus: 'PENDING',
      updatedAt: new Date(),
    },
  });
}

  async update(id: string, data: Prisma.DeliveryUpdateInput) {
    try {
      return await this.prisma.delivery.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Delivery with id ${id} was not found`);
      }

      throw error;
    }
  }

  async createCheckoutSession(
    deliveryId: string,
    data: CreateDeliveryCheckoutDto,
  ) {
    const delivery = await this.prisma.delivery.findUnique({
      where: { id: deliveryId },
    });

    if (!delivery) {
      throw new NotFoundException(`Delivery with id ${deliveryId} was not found`);
    }

    if (
      delivery.paymentStatus === 'PENDING' &&
      delivery.checkoutSessionId &&
      delivery.checkoutUrl
    ) {
      return {
        checkout_id: delivery.checkoutSessionId,
        checkout_url: delivery.checkoutUrl,
        reference: delivery.trackingId,
      };
    }

    if (delivery.paymentStatus === 'PAID' || delivery.paymentStatus === 'PROCESSING') {
      throw new ConflictException('This delivery already has a completed payment');
    }

    const bookingDetails: Prisma.InputJsonObject = {
      request_token: data.request_token,
      courier_id: data.courier_id,
      service_code: data.service_code,
      insurance_code: data.insurance_code ?? null,
      is_cod_label: false,
      duties_paid: false,
    };
    const checkoutPayload: BachsCreateCheckoutSessionDto = {
      expires_in_minutes: 60,
      customer_creation: 'if_required',
      save_payment_method: false,
      pricing: {
        currency: data.currency.toUpperCase(),
        amount: data.amount,
        price_type: 'fixed',
      },
      billing_currency: data.currency.toUpperCase(),
      reference: delivery.trackingId,
    };
    const checkout = await this.bachsService.createCheckoutSession(checkoutPayload);

    if (
      typeof checkout?.checkout_id !== 'string' ||
      typeof checkout?.checkout_url !== 'string'
    ) {
      throw new InternalServerErrorException(
        'Bachs checkout response did not include checkout_id and checkout_url',
      );
    }

    await this.prisma.delivery.update({
      where: { id: deliveryId },
      data: {
        checkoutSessionId: checkout.checkout_id,
        checkoutUrl: checkout.checkout_url,
        paymentAmount: data.amount,
        paymentCurrency: data.currency.toUpperCase(),
        paymentStatus: 'PENDING',
        bookingStatus: 'NOT_STARTED',
        bookingDetails,
        bookingError: null,
        deliveryStatus: 'PAYMENT_PENDING',
        updatedAt: new Date(),
      },
    });

    return {
      checkout_id: checkout.checkout_id,
      checkout_url: checkout.checkout_url,
      reference: delivery.trackingId,
    };
  }

  async completePaidCheckout(reference: string, checkoutId?: string) {
    const delivery = await this.prisma.delivery.findFirst({
      where: { trackingId: reference },
    });

    if (!delivery) {
      throw new NotFoundException(
        `No delivery found for checkout reference ${reference}`,
      );
    }

    if (checkoutId && delivery.checkoutSessionId !== checkoutId) {
      throw new BadRequestException(
        'Checkout ID does not match the delivery checkout session',
      );
    }

    if (!delivery.checkoutSessionId || !delivery.bookingDetails) {
      throw new BadRequestException(
        'Delivery does not have a pending checkout and courier booking',
      );
    }

    const booking = delivery.bookingDetails;
    if (
      typeof booking !== 'object' ||
      booking === null ||
      Array.isArray(booking) ||
      typeof booking.request_token !== 'string' ||
      typeof booking.courier_id !== 'string' ||
      typeof booking.service_code !== 'string'
    ) {
      throw new BadRequestException(
        'Stored courier booking details are invalid',
      );
    }

    const bookingRequest: CreateShipmentDto = {
      request_token: booking.request_token,
      courier_id: booking.courier_id,
      service_code: booking.service_code,
      ...(typeof booking.insurance_code === 'string'
        ? { insurance_code: booking.insurance_code }
        : {}),
      is_cod_label: false,
      duties_paid: false,
    };

    const claim = await this.prisma.delivery.updateMany({
      where: {
        id: delivery.id,
        paymentStatus: { in: ['PENDING', 'PAID'] },
        bookingStatus: { in: ['NOT_STARTED', 'FAILED'] },
      },
      data: {
        paymentStatus: 'PAID',
        bookingStatus: 'PROCESSING',
        bookingError: null,
        updatedAt: new Date(),
      },
    });

    if (claim.count === 0) {
      return { processed: false, paymentStatus: delivery.paymentStatus };
    }

    try {
      const shipmentResult = await this.shipbubbleService.createShipment(
        bookingRequest,
      );
      const response = this.asRecord(shipmentResult) ?? {};
      const shipment =
        this.asRecord(response.data) ?? response;
      const courier = this.asRecord(shipment.courier);
      const payment = this.asRecord(shipment.payment);

      if (
        (typeof response.status === 'string' &&
          response.status !== 'success') ||
        typeof shipment.order_id !== 'string'
      ) {
        throw new Error(
          (typeof response.message === 'string' && response.message) ||
            'Shipbubble did not confirm shipment booking',
        );
      }

      await this.prisma.delivery.update({
        where: { id: delivery.id },
        data: {
          paymentStatus: 'PAID',
          bookingStatus: 'BOOKED',
          deliveryStatus:
            typeof shipment.status === 'string'
              ? shipment.status.toUpperCase()
              : 'CONFIRMED',
          shipbubbleOrderId: shipment.order_id,
          tracking_url:
            typeof shipment.tracking_url === 'string'
              ? shipment.tracking_url
              : null,
          courier_name:
            typeof courier?.name === 'string' ? courier.name : null,
          courier_email:
            typeof courier?.email === 'string' ? courier.email : null,
          courier_phone:
            typeof courier?.phone === 'string' ? courier.phone : null,
          package_amount:
            shipment.package_amount == null
              ? null
              : String(shipment.package_amount),
          package_weight:
            shipment.package_weight == null
              ? null
              : String(shipment.package_weight),
          shipping_fee:
            payment?.shipping_fee == null
              ? null
              : String(payment.shipping_fee),
          shipping_payment_type:
            typeof payment?.type === 'string' ? payment.type : null,
          shipping_payment_status: 'PAID',
          bookingError: null,
          updatedAt: new Date(),
        },
      });

      return { processed: true, paymentStatus: 'PAID' };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : String(error);
      await this.prisma.delivery.update({
        where: { id: delivery.id },
        data: {
          paymentStatus: 'PAID',
          bookingStatus: 'FAILED',
          deliveryStatus: 'BOOKING_FAILED',
          bookingError: message,
          updatedAt: new Date(),
        },
      });
      throw error;
    }
  }

  async syncShipbubbleStatusByOrderId(
    orderId: string,
    status: string,
    packageStatus?: Array<{ status: string; datetime: string }>,
  ) {
    const result = await this.prisma.delivery.updateMany({
      where: { shipbubbleOrderId: orderId },
      data: {
        deliveryStatus: status.trim().toUpperCase(),
        ...(packageStatus ? { package_status: packageStatus } : {}),
        updatedAt: new Date(),
      },
    });

    return result.count;
  }

async getDeliveriesByUserId(userId: string) {
  return this.prisma.delivery.findMany({
    where: {
      userId: String(userId),
    },
  });
}

async getDeliveryByTrackingId(trackingId: string) {
  let delivery = await this.prisma.delivery.findFirst({
    where: { trackingId },
  });

  if (!delivery) {
    throw new NotFoundException(
      `Delivery with tracking ID ${trackingId} was not found`,
    );
  }

  if (
    delivery.checkoutSessionId &&
    delivery.bookingDetails &&
    (delivery.paymentStatus === 'PENDING' ||
      (delivery.paymentStatus === 'PAID' &&
        delivery.bookingStatus === 'FAILED'))
  ) {
    const paymentsResponse = await this.bachsService.getPayments(50);
    const payments = this.asRecord(paymentsResponse)?.items;
    if (!Array.isArray(payments)) {
      throw new InternalServerErrorException(
        'Bachs payments response did not include a valid items array',
      );
    }

    const expectedCheckoutId = delivery.checkoutSessionId;
    const matchingPayment = payments.find((payment: unknown) => {
      const entry = this.asRecord(payment);
      const source = this.asRecord(entry?.source);
      const paymentCheckoutId = source?.checkout_id;
      return (
        (entry?.reference === trackingId ||
          source?.reference === trackingId) &&
        typeof entry?.status === 'string' &&
        entry.status.toLowerCase() === 'succeeded' &&
        (typeof paymentCheckoutId !== 'string' ||
          paymentCheckoutId === expectedCheckoutId)
      );
    });

    if (matchingPayment) {
      const entry = this.asRecord(matchingPayment);
      const source = this.asRecord(entry?.source);
      const checkoutId =
        typeof source?.checkout_id === 'string'
          ? source.checkout_id
          : undefined;
      await this.completePaidCheckout(trackingId, checkoutId);
      delivery = await this.prisma.delivery.findUniqueOrThrow({
        where: { id: delivery.id },
      });
    }
  }

  return delivery;
}

  async getDeliveries() {
    const deliveries = await this.prisma.delivery.findMany();
    return deliveries;
  }

  async getDeliveryStatistics() {
    const totalDeliveries = await this.prisma.delivery.count();
    const paidDeliveries = await this.prisma.delivery.count({
      where: { deliveryStatus: 'DEL' },
    });
    const pendingDeliveries = await this.prisma.delivery.count({
      where: { deliveryStatus: 'PENDING' },
    });
    const failedDeliveries = await this.prisma.delivery.count({
      where: { deliveryStatus: 'BOOKING_FAILED' },
    });

    return {
      totalDeliveries,
      paidDeliveries,
      pendingDeliveries,
      failedDeliveries,
    };
  }

  private asRecord(value: unknown): Record<string, unknown> | null {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
      ? value as Record<string, unknown>
      : null;
  }
}
