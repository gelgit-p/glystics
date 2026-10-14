import {
  BadRequestException,
  HttpException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import Shipbubble from 'shipbubble';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { FetchReturnRatesDto } from './dto/fetch-return-rates.dto';
import {
  WebhookSimulatorDto,
  webhookStatuses,
} from './dto/webhook-simulator.dto';

export interface ValidateAddressInput {
  name: string;
  email: string;
  phone: string;
  address: string;
  latitude?: number;
  longitude?: number;
}

export type UpdateValidatedAddressInput = Partial<ValidateAddressInput>;

export interface PackageItem {
  name: string;
  description: string;
  unit_weight: string;
  unit_amount: string;
  quantity: number;
}

export interface PackageDimension {
  length: number;
  width: number;
  height: number;
}

export interface FetchRatesInput {
  sender_address_code: number;
  reciever_address_code: number;
  pickup_date: string;
  category_id: number;
  package_items: PackageItem[];
  package_dimension: PackageDimension;
  service_type?: string;
  delivery_instructions?: string;
}

@Injectable()
export class ShipbubbleService {
  private readonly baseUrl = 'https://api.shipbubble.com/v1/shipping';

  constructor() {
    const apiKey = process.env.SHIPBUBBLE_API_KEY?.trim();
    if (!apiKey) {
      throw new ServiceUnavailableException(
        'SHIPBUBBLE_API_KEY is not configured.',
      );
    }

    Shipbubble.init({ apiKey });
  }

  async getWalletBalance(): Promise<unknown> {
    return this.fromSdk(Shipbubble.wallet.walletBalance());
  }

  async createValidatedAddress(data: ValidateAddressInput): Promise<unknown> {
    return this.fromSdk(Shipbubble.address.validateAddress(data));
  }

  async getValidatedAddresses(): Promise<unknown> {
    return this.fromSdk(Shipbubble.address.getValidatedAddresses());
  }

  async updateValidatedAddress(
    addressCode: number,
    data: UpdateValidatedAddressInput,
  ): Promise<unknown> {
    if (
      data.address !== undefined ||
      data.latitude !== undefined ||
      data.longitude !== undefined
    ) {
      return this.request(`/address/${addressCode}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    }

    return this.fromSdk(
      Shipbubble.address.editAddress({
        addressCode,
        ...data,
      }),
    );
  }

  async getAddressDetails(addressCode: number): Promise<unknown> {
    return this.fromSdk(Shipbubble.address.getSingleAddress({ addressCode }));
  }

  async getPackageCategories(): Promise<unknown> {
    return this.fromSdk(Shipbubble.misc.getPackageCategories());
  }

  async getPackageDimensions(): Promise<unknown> {
    return this.fromSdk(Shipbubble.misc.getPackageDimensions());
  }

  async getCouriers(): Promise<unknown> {
    return this.fromSdk(Shipbubble.misc.getCouriers());
  }

  async getCourierCoverageAreas(
    serviceCode: string,
    data: Record<string, unknown> = {},
  ): Promise<unknown> {
    return this.request(`/couriers/${serviceCode}/coverage`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async fetchShippingRates(data: FetchRatesInput): Promise<unknown> {
    // SDK 1.0.6 accepts serviceType but omits it from its serialized request.
    if (data.service_type !== undefined) {
      return this.request('/fetch_rates', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    }

    return this.fromSdk(
      Shipbubble.rates.requestShippingRates(this.toSdkRatesInput(data)),
    );
  }

  async fetchShippingRatesForCouriers(
    serviceCodes: string,
    data: FetchRatesInput,
  ): Promise<unknown> {
    if (data.service_type !== undefined) {
      return this.request(`/fetch_rates/${serviceCodes}`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    }

    return this.fromSdk(
      Shipbubble.rates.requestShippingRatesFromCouriers({
        ...this.toSdkRatesInput(data),
        serviceCodes: serviceCodes.split(',').map((code) => code.trim()),
      }),
    );
  }

  async updateFetchRatesRequestToken(
    data: Record<string, unknown>,
  ): Promise<unknown> {
    return this.fromSdk(
      Shipbubble.rates.editRequestTokenDetails({
        recieverName: this.requiredString(data, 'reciever_name'),
        recieverPhone: this.requiredString(data, 'reciever_phone'),
        senderName: this.requiredString(data, 'sender_name'),
        senderPhone: this.requiredString(data, 'sender_phone'),
        requestToken: this.requiredString(data, 'request_token'),
      }),
    );
  }

  async getInsuranceRates(requestToken: string): Promise<unknown> {
    return this.fromSdk(
      Shipbubble.insurance.getInsuranceRates({ requestToken }),
    );
  }

  async calculateLandedCost(
    requestToken: string,
    storeCheckoutCurrency?: string,
  ): Promise<unknown> {
    const query = new URLSearchParams({ request_token: requestToken });

    if (storeCheckoutCurrency) {
      query.set('store_checkout_currency', storeCheckoutCurrency);
    }

    return this.request(`/landed-cost?${query.toString()}`);
  }

  async createShipment(data: CreateShipmentDto): Promise<unknown> {
    // SDK 1.0.6 does not serialize is_cod_label or duties_paid.
    console.log('Creating shipment with data:', data);
    return this.request('/labels', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async cancelShipment(orderId: string): Promise<unknown> {
    return this.fromSdk(Shipbubble.shipments.cancelShipment({ orderId }));
  }

  async simulateWebhook(
    orderId: string,
    data: WebhookSimulatorDto,
  ): Promise<unknown> {
    if (!webhookStatuses.includes(data.status_code)) {
      throw new BadRequestException(
        `status_code must be one of: ${webhookStatuses.join(', ')}`,
      );
    }

    return this.request(`/labels/webhooks/${orderId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async fetchReturnShipmentRates(
    orderId: string,
    data: FetchReturnRatesDto,
  ): Promise<unknown> {
    return this.request(`/returns/${orderId}/fetch_rates`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getShipments(): Promise<unknown> {
    return this.fromSdk(Shipbubble.tracking.getShipments());
  }

  async getShipmentsByOrderIds(orderIds: string): Promise<unknown> {
    return this.request(`/labels/list/${orderIds}`);
  }

  private toSdkRatesInput(
    data: FetchRatesInput,
  ): Parameters<typeof Shipbubble.rates.requestShippingRates>[0] {
    const pickupDate = new Date(data.pickup_date);
    const serviceType = data.service_type;
    const sdkServiceType =
      serviceType === 'pickup'
        ? 'pickup'
        : serviceType === 'dropoff'
          ? 'dropoff'
          : undefined;
    if (Number.isNaN(pickupDate.getTime())) {
      throw new BadRequestException('pickup_date must be a valid date.');
    }

    if (serviceType !== undefined && !sdkServiceType) {
      throw new BadRequestException('service_type must be pickup or dropoff.');
    }

    return {
      senderAddressCode: data.sender_address_code,
      recieverAddressCode: data.reciever_address_code,
      pickupDate,
      categoryId: data.category_id,
      packageItems: data.package_items.map((item) => ({
        name: item.name,
        description: item.description,
        unitWeight: this.toNumber(item.unit_weight, 'unit_weight'),
        unitAmount: this.toNumber(item.unit_amount, 'unit_amount'),
        quantity: item.quantity,
      })),
      packageDimension: data.package_dimension,
      ...(sdkServiceType ? { serviceType: sdkServiceType } : {}),
      ...(data.delivery_instructions
        ? { deliveryInstructions: data.delivery_instructions }
        : {}),
    };
  }

  private toNumber(value: string, field: string): number {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      throw new BadRequestException(`${field} must be a valid number.`);
    }

    return parsed;
  }

  private requiredString(data: Record<string, unknown>, field: string): string {
    const value = data[field];
    if (typeof value !== 'string' || !value.trim()) {
      throw new BadRequestException(`${field} is required.`);
    }

    return value;
  }

  private async fromSdk<T>(operation: Promise<{ raw: T }>): Promise<T> {
    try {
      return (await operation).raw;
    } catch (error) {
      if (!(error instanceof Error) || !('details' in error)) {
        throw error;
      }

      const details = error.details;
      if (typeof details !== 'object' || details === null) {
        throw error;
      }

      const response = (details as Record<string, unknown>).response;
      if (typeof response !== 'object' || response === null) {
        throw error;
      }

      const { status, data } = response as {
        status?: unknown;
        data?: unknown;
      };
      if (
        typeof status !== 'number' ||
        !Number.isInteger(status) ||
        status < 400 ||
        status > 599
      ) {
        throw error;
      }

      throw new HttpException(data ?? { message: error.message }, status);
    }
  }

  private async request(
    path: string,
    options: RequestInit = {},
  ): Promise<unknown> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.SHIPBUBBLE_API_KEY}`,
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      let errorBody: string | Record<string, unknown> = errorText;

      try {
        const parsed: unknown = JSON.parse(errorText);
        if (
          typeof parsed === 'string' ||
          (typeof parsed === 'object' && parsed !== null)
        ) {
          errorBody = parsed as string | Record<string, unknown>;
        }
      } catch {
        // Keep the raw response when Shipbubble does not return JSON.
      }

      throw new HttpException(errorBody, response.status);
    }

    return response.json();
  }
}
