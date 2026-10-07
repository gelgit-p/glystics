import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateDeliveryDto) {
    return this.deliveryService.update(id, data);
  }
}
