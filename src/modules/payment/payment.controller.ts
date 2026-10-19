import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BachsCreateCheckoutSessionDto } from './payment.dto';
import { BachsService } from './payment.service';

@Controller('payment')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class PaymentController {
  constructor(private readonly bachsService: BachsService) {}

  @Post('checkout-sessions')
  createCheckoutSession(
    @Body() dto: BachsCreateCheckoutSessionDto,
  ): Promise<any> {
    return this.bachsService.createCheckoutSession(dto);
  }

  @Get('checkout-sessions/:checkoutId')
  getCheckoutSessionById(
    @Param('checkoutId') checkoutId: string,
  ): Promise<any> {
    return this.bachsService.getCheckoutSessionById(checkoutId);
  }

  @Get('payments')
  getPayments(@Query('limit') limit?: string): Promise<any> {
    return this.bachsService.getPayments(
      limit === undefined ? 50 : Number(limit),
    );
  }
}