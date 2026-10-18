import {
  Body,
  BadRequestException,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { timingSafeEqual } from 'node:crypto';
import { CreditsService } from './credit.service';
import { BuyCreditsDto } from './dto/buy-credits.dto';
import { RefundCreditsDto, SpendCreditsDto } from './dto/spend-credits.dto';

type AuthenticatedRequest = Request & {
  user: { id: string };
};

@Controller('credits')
// @UseGuards(AuthGuard('jwt'))
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class CreditController {
  constructor(
    private readonly creditsService: CreditsService,
    private readonly configService: ConfigService,
  ) {}

  @Get('wallet')
  getWallet(@Req() request: AuthenticatedRequest) {
    return this.creditsService.getWallet(request.user.id);
  }

  @Get('packages')
  getPackages() {
    return this.creditsService.getPackages();
  }

  @Get('transactions')
  getTransactions(
    @Req() request: AuthenticatedRequest,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: string,
  ) {
    const pageSize = limit === undefined ? 20 : Number(limit);
    if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100) {
      throw new BadRequestException('Transaction limit must be between 1 and 100');
    }
    return this.creditsService.getTransactions(
      request.user.id,
      cursor,
      pageSize,
    );
  }

  @Post('purchases')
  createPurchase(
    @Req() request: AuthenticatedRequest,
    @Body() dto: BuyCreditsDto,
  ) {
    return this.creditsService.createPurchase(request.user.id, dto.packageId);
  }

  @Post('purchases/:reference/verify')
  verifyPurchase(
    @Req() request: AuthenticatedRequest,
    @Param('reference') reference: string,
  ) {
    return this.creditsService.verifyPurchase(request.user.id, reference);
  }

  @Post('spend')
  spend(
    @Req() request: AuthenticatedRequest,
    @Body() dto: SpendCreditsDto,
  ) {
    return this.creditsService.spend(request.user.id, dto);
  }

  @Post('refund')
  refund(
    @Req() request: AuthenticatedRequest,
    @Headers('x-credit-admin-key') adminKey: string,
    @Body() dto: RefundCreditsDto,
  ) {
    const expectedKey = this.configService.get<string>('CREDIT_ADMIN_API_KEY');
    if (!expectedKey || !this.safeCompare(expectedKey, adminKey ?? '')) {
      throw new UnauthorizedException(
        'Credit refunds are restricted to support administrators',
      );
    }
    return this.creditsService.refundUsage(
      request.user.id,
      dto.usageTransactionId,
      dto.description,
    );
  }

  private safeCompare(expected: string, received: string) {
    const expectedBuffer = Buffer.from(expected);
    const receivedBuffer = Buffer.from(received);
    return (
      expectedBuffer.length === receivedBuffer.length &&
      timingSafeEqual(expectedBuffer, receivedBuffer)
    );
  }
}