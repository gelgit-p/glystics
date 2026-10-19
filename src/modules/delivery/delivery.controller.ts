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
import { AuthGuard } from '@nestjs/passport';
import { Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryCheckoutDto } from './dto/create-delivery-checkout.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Controller('delivery')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Req() request: Request & { user: { id: string } },
    @Body() data: UpdateDeliveryDto,
  ) {
    return this.deliveryService.create({
      ...data,
      userId: request.user.id,
    });
  }

  @Get('analytics')
  @UseGuards(AuthGuard('jwt'))
  getAnalytics(@Req() request: Request & { user: { id: string } }) {
    return this.deliveryService.getAnalytics(request.user.id);
  }

  @Post(':id/checkout-session')
  @UseGuards(AuthGuard('jwt'))
  createCheckoutSession(
    @Req() request: Request & { user: { id: string } },
    @Param('id') id: string,
    @Body() data: CreateDeliveryCheckoutDto,
  ) {
    return this.deliveryService.createCheckoutSession(
      id,
      request.user.id,
      data,
    );
  }

  @Post(':id/checkout-session/regenerate')
  @UseGuards(AuthGuard('jwt'))
  regenerateCheckoutSession(
    @Req() request: Request & { user: { id: string } },
    @Param('id') id: string,
  ) {
    return this.deliveryService.regenerateCheckoutSession(
      id,
      request.user.id,
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  getDeliveriesByUserId(@Req() request: Request & { user: { id: string } }) {
    return this.deliveryService.getDeliveriesByUserId(request.user.id);
  }

  @Get('tracking/:trackingId')
  getDeliveryByTrackingId(@Param('trackingId') trackingId: string) {
    return this.deliveryService.getDeliveryByTrackingId(trackingId);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getDeliveries(@Req() request: Request & { user: { id: string } }) {
    return this.deliveryService.getDeliveriesByUserId(request.user.id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Req() request: Request & { user: { id: string } },
    @Param('id') id: string,
    @Body() data: UpdateDeliveryDto,
  ) {
    return this.deliveryService.update(id, data, request.user.id);
  }
}
