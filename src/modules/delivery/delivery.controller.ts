import {
  Body,
  Controller,
  Param,
  Patch,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryCheckoutDto } from './dto/create-delivery-checkout.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Controller('delivery')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  create(@Body() data: UpdateDeliveryDto) {
    return this.deliveryService.create(data);
  }

  @Post(':id/checkout-session')
  createCheckoutSession(
    @Param('id') id: string,
    @Body() data: CreateDeliveryCheckoutDto,
  ) {
    return this.deliveryService.createCheckoutSession(id, data);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getDeliveriesByUserId(@Param('id') id: string) {
    return this.deliveryService.getDeliveriesByUserId(id);
  }

  @Get('tracking/:trackingId')
  getDeliveryByTrackingId(@Param('trackingId') trackingId: string) {
    return this.deliveryService.getDeliveryByTrackingId(trackingId);
  }

  @Get()
  getDeliveries() {
    return this.deliveryService.getDeliveries();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateDeliveryDto) {
    return this.deliveryService.update(id, data);
  }
}
