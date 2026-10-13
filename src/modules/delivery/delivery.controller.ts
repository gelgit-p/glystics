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
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Controller('delivery')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  create(@Body() data: UpdateDeliveryDto) {
    return this.deliveryService.create(data);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getDeliveriesByUserId(@Param('id') id: string) {
    return this.deliveryService.getDeliveriesByUserId(id);
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
