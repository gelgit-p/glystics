import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ShipbubbleService } from './shipbubble.service';
import { CourierCoverageDto } from './dto/courier-coverage.dto';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { FetchRatesDto } from './dto/fetch-rates.dto';
import { FetchSelectedRatesDto } from './dto/fetch-selected-rates.dto';
import { FetchReturnRatesDto } from './dto/fetch-return-rates.dto';
import { WebhookSimulatorDto } from './dto/webhook-simulator.dto';
import {
	UpdateValidatedAddressDto,
	ValidateAddressDto,
} from './dto/validate-address.dto';
import { UpdateRequestTokenDto } from './dto/update-request-token.dto';
import { LandedCostDto } from './dto/landed-cost.dto';
import { isFailedEnvelope, normalizeCouriers, normalizeCoverage } from './couriers.util';
import { NotFoundException } from '@nestjs/common';

// Public, unauthenticated courier directory for the landing page. Only normalized,
// marketing-safe fields are exposed (the service strips everything else).
@Controller('public/couriers')
export class PublicCouriersController {
	constructor(private readonly shipbubbleService: ShipbubbleService) {}

	@Get()
	async getCouriers() {
		return normalizeCouriers(await this.shipbubbleService.getCouriers());
	}

	// GET to mirror upstream Shipbubble (POST there returns a failed envelope).
	// The legacy POST route is kept for one release so older clients don't break;
	// it behaves identically. Remove after the frontend (GET) is fully deployed.
	@Get(':serviceCode/coverage')
	async getCourierCoverageAreas(@Param('serviceCode') serviceCode: string) {
		const raw = await this.shipbubbleService.getCourierCoverageAreas(serviceCode);
		if (isFailedEnvelope(raw)) throw new NotFoundException('Coverage not available for this courier');
		return normalizeCoverage(raw);
	}

	@Post(':serviceCode/coverage')
	async getCourierCoverageAreasLegacy(
		@Param('serviceCode') serviceCode: string,
		@Body() _data: CourierCoverageDto,
	) {
		void _data;
		return this.getCourierCoverageAreas(serviceCode);
	}
}

@Controller('shipping')
export class ShipbubbleController {
	constructor(private readonly shipbubbleService: ShipbubbleService) {}

	@Get('wallet/balance')
	getWalletBalance() {
		return this.shipbubbleService.getWalletBalance();
	}

	@Post('address/validate')
	createValidatedAddress(@Body() data: ValidateAddressDto) {
		return this.shipbubbleService.createValidatedAddress(data);
	}

	@Get('address')
	getValidatedAddresses() {
		return this.shipbubbleService.getValidatedAddresses();
	}

	@Patch('address/:addressCode')
	updateValidatedAddress(
		@Param('addressCode') addressCode: string,
		@Body() data: UpdateValidatedAddressDto,
	) {
		return this.shipbubbleService.updateValidatedAddress(
			Number(addressCode),
			data,
		);
	}

	@Get('address/:addressCode')
	getAddressDetails(@Param('addressCode') addressCode: string) {
		return this.shipbubbleService.getAddressDetails(Number(addressCode));
	}

	@Get('labels/categories')
	getPackageCategories() {
		return this.shipbubbleService.getPackageCategories();
	}

	@Get('labels/boxes')
	getPackageDimensions() {
		return this.shipbubbleService.getPackageDimensions();
	}

	@Get('couriers')
	getCouriers() {
		return this.shipbubbleService.getCouriers();
	}

	@Get('couriers/:serviceCode/coverage')
	getCourierCoverageAreasGet(@Param('serviceCode') serviceCode: string) {
		return this.shipbubbleService.getCourierCoverageAreas(serviceCode);
	}

	// Legacy POST kept for compatibility; upstream is GET-only for coverage.
	@Post('couriers/:serviceCode/coverage')
	getCourierCoverageAreas(
		@Param('serviceCode') serviceCode: string,
		@Body() data: CourierCoverageDto,
	) {
		return this.shipbubbleService.getCourierCoverageAreas(serviceCode, data);
	}

	@Post('fetch_rates')
	fetchShippingRates(@Body() data: FetchRatesDto) {
		return this.shipbubbleService.fetchShippingRates(data);
	}

	@Post('fetch_rates/:serviceCodes')
	fetchShippingRatesForCouriers(
		@Param('serviceCodes') serviceCodes: string,
		@Body() data: FetchSelectedRatesDto,
	) {
		return this.shipbubbleService.fetchShippingRatesForCouriers(
			serviceCodes,
			data,
		);
	}

	@Patch('fetch_rates/request_token')
	updateFetchRatesRequestToken(@Body() data: UpdateRequestTokenDto) {
		return this.shipbubbleService.updateFetchRatesRequestToken(data);
	}

	@Get('insurance_rates')
	getInsuranceRates(@Query('request_token') requestToken: string) {
		return this.shipbubbleService.getInsuranceRates(requestToken);
	}

	@Get('landed-cost')
	calculateLandedCost(@Query() query: LandedCostDto) {
		return this.shipbubbleService.calculateLandedCost(
			query.request_token,
			query.store_checkout_currency,
		);
	}

	@Post('labels')
	createShipment(@Body() data: CreateShipmentDto) {
		return this.shipbubbleService.createShipment(data);
	}

	@Post('labels/cancel/:orderId')
	cancelShipment(@Param('orderId') orderId: string) {
		return this.shipbubbleService.cancelShipment(orderId);
	}

	@Post('labels/webhooks/:orderId')
	simulateWebhook(
		@Param('orderId') orderId: string,
		@Body() data: WebhookSimulatorDto,
	) {
		return this.shipbubbleService.simulateWebhook(orderId, data);
	}

	@Post('returns/:orderId/fetch_rates')
	fetchReturnShipmentRates(
		@Param('orderId') orderId: string,
		@Body() data: FetchReturnRatesDto,
	) {
		return this.shipbubbleService.fetchReturnShipmentRates(orderId, data);
	}

	@Get('labels')
	getShipments() {
		return this.shipbubbleService.getShipments();
	}

	@Get('labels/list/:orderIds')
	getShipmentsByOrderIds(@Param('orderIds') orderIds: string) {
		return this.shipbubbleService.getShipmentsByOrderIds(orderIds);
	}
}
