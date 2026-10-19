import { IsEnum, IsNumber, IsString, IsOptional, IsNotEmpty, IsIn, IsArray, ArrayMinSize, ValidateNested, Min, Max, IsEmail, IsObject, Length, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class PaystackWebhookResponseDto<T> {
  @IsBoolean()
  ignored: boolean;

  @IsString()
  message: string;

  data?: T;
}


export class BachsCustomerDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class BachsResolveBankAccountDto {
  @IsString()
  @IsNotEmpty()
  account_number: string;

  @IsString()
  @IsNotEmpty()
  bank_code: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  country: string;
}

export class BachsCreatePayoutQuoteDto {
  @IsString()
  @IsNotEmpty()
  from_currency: string;

  @IsString()
  @IsNotEmpty()
  to_currency: string;

  @IsString()
  @IsNotEmpty()
  amount: string;
}

export class BachsUpdateCustomerDto extends PartialType(BachsCustomerDto) {}

export class BachsCreatePayoutDto {
  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  reference: string;
}

export class BachsResolvePayoutAccountDto {
  @IsString()
  @IsNotEmpty()
  bank_code: string;

  @IsString()
  @IsNotEmpty()
  account_number: string;
}

export class BachsCreatePayoutDestinationDto {
  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  account_number: string;

  @IsString()
  @IsNotEmpty()
  bank_code: string;
}

export class BachsUpdatePayoutDestinationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  account_number?: string;

  @IsOptional()
  @IsString()
  bank_code?: string;
}

export class BachsCreateTransferDto {
  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  transfer_group?: string;
}


export class BachsCartItemDto {
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsString()
  @IsNotEmpty()
  product_id: string;
}

export class BachsPricingDto {
    @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currency!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  amount!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  price_type!: string;
}

export class BachsCreateCheckoutSessionDto {
    @ApiProperty()
  @IsNumber()
  @Min(1)
  expires_in_minutes!: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customer_creation!: string;

  @ApiProperty()
  @IsBoolean()
  save_payment_method!: boolean;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => BachsPricingDto)
  pricing!: BachsPricingDto;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  billing_currency!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reference!: string;
}

export class BachsCurrencyOptionDto {
  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  amount: string;
}

export class BachsPriceDto {
  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BachsCurrencyOptionDto)
  currency_options?: BachsCurrencyOptionDto[];
}

export class BachsBillingCycleDto {
  @IsString()
  @IsNotEmpty()
  interval: string;

  @IsNumber()
  @Min(1)
  frequency: number;
}

export class BachsTrialPeriodDto {
  @IsString()
  @IsNotEmpty()
  interval: string;

  @IsNumber()
  @Min(1)
  frequency: number;
}

export class BachsCreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  @ValidateNested()
  @Type(() => BachsPriceDto)
  price: BachsPriceDto;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => BachsBillingCycleDto)
  billing_cycle?: BachsBillingCycleDto;

   @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => BachsTrialPeriodDto)
  trial_period?: BachsTrialPeriodDto;
}

export class BachsUpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}



export class CreateCustomerDto {
  @IsString()
  email: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  phone: string;

  @IsString()
  metadata: any;
}


export class ValidateAccountDto {
  @IsString()
  account_number: string;

  @IsString()
  bank_code: string;
}

export class CreateSplitDto {
  @IsString()
  @IsNotEmpty()
  name: string; // e.g. "Halfsies"
 
  @IsIn(['percentage', 'flat'])
  type: 'percentage' | 'flat';
 
  @IsString()
  @IsNotEmpty()
  currency: string; // e.g. "NGN"
 
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  // @Type(() => SubaccountDto)
  subaccounts: SubaccountDto[];
 
  @IsOptional()
  @IsIn(['all', 'account', 'subaccount'])
  bearer_type?: 'all' | 'account' | 'subaccount';
 
  @IsOptional()
  @IsString()
  bearer_subaccount?: string;
}

export class SubaccountDto {
  @IsString()
  @IsNotEmpty()
  subaccount: string; // e.g. "ACCT_6uujpqtzmnufzkw"
 
  @IsNumber()
  @Min(0)
  @Max(100)
  share: number; // percentage or flat amount depending on split "type"
 
  @IsOptional()
  @IsNumber()
  transaction_charge?: number;
 
  @IsOptional()
  @IsString()
  transaction_charge_type?: string;
}
