import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
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

	async getWalletBalance(): Promise<unknown> {
		return this.request('/wallet/balance');
	}

	async createValidatedAddress(
		data: ValidateAddressInput,
	): Promise<unknown> {
		return this.request('/address/validate', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	async getValidatedAddresses(): Promise<unknown> {
		return this.request('/address');
	}

	async updateValidatedAddress(
		addressCode: number,
		data: UpdateValidatedAddressInput,
	): Promise<unknown> {
		return this.request(`/address/${addressCode}`, {
			method: 'PATCH',
			body: JSON.stringify(data),
		});
	}

	async getAddressDetails(addressCode: number): Promise<unknown> {
		return this.request(`/address/${addressCode}`);
	}

	async getPackageCategories(): Promise<unknown> {
		return this.request('/labels/categories');
	}

	async getPackageDimensions(): Promise<unknown> {
		return this.request('/labels/boxes');
	}

	async getCouriers(): Promise<unknown> {
		return this.request('/couriers');
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
		return this.request('/fetch_rates', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	async fetchShippingRatesForCouriers(
		serviceCodes: string,
		data: Record<string, unknown> = {},
	): Promise<unknown> {
		return this.request(`/fetch_rates/${serviceCodes}`, {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	async updateFetchRatesRequestToken(
		data: Record<string, unknown>,
	): Promise<unknown> {
		return this.request('/fetch_rates/request_token', {
			method: 'PATCH',
			body: JSON.stringify(data),
		});
	}

	async getInsuranceRates(requestToken: string): Promise<unknown> {
		const query = new URLSearchParams({ request_token: requestToken });
		return this.request(`/insurance_rates?${query.toString()}`);
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
		return this.request('/labels', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	async cancelShipment(orderId: string): Promise<unknown> {
		return this.request(`/labels/cancel/${orderId}`, {
			method: 'POST',
		});
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
		return this.request('/labels');
	}

	async getShipmentsByOrderIds(orderIds: string): Promise<unknown> {
		return this.request(`/labels/list/${orderIds}`);
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
				errorBody = JSON.parse(errorText);
			} catch {
				// Keep the raw response when Shipbubble does not return JSON.
			}

			throw new HttpException(errorBody, response.status);
		}

		return response.json();
	}
}
