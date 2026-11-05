import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDateString, IsEmail, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export const WINDOWS = ['MORNING', 'AFTERNOON', 'EVENING', 'CUSTOM'] as const;

export class CreateNetworkBusinessDto {
  @ApiProperty() @IsString() businessName: string;
  @ApiProperty() @IsEmail() businessEmail: string;
  @ApiProperty() @IsString() contactPhone: string;
  @ApiProperty() @IsString() category: string;
  @ApiProperty({ type: [String] }) @IsArray() @IsString({ each: true }) pickupLocations: string[];
  @ApiProperty({ type: [String] }) @IsArray() @IsString({ each: true }) operatingRegions: string[];
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Type(() => Number) expectedDailyVolume?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Type(() => Number) expectedWeeklyVolume?: number;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true }) preferredWindows?: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() planId?: string;
  @ApiPropertyOptional({ enum: ['MONTHLY', 'ANNUAL', 'PAY_AS_YOU_GO'] }) @IsOptional() @IsString() billingCycle?: string;
}

export class UpdateNetworkBusinessDto {
  @ApiPropertyOptional() @IsOptional() @IsString() businessName?: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() businessEmail?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() contactPhone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() category?: string;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true }) pickupLocations?: string[];
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true }) operatingRegions?: string[];
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Type(() => Number) expectedDailyVolume?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Type(() => Number) expectedWeeklyVolume?: number;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsString({ each: true }) preferredWindows?: string[];
  @ApiPropertyOptional() @IsOptional() @IsBoolean() aiAutoDispatchEnabled?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() aiAutoReserveEnabled?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Type(() => Number) aiSpendLimitCredits?: number;
}

export class CreateSubscriptionDto {
  @ApiProperty() @IsString() planId: string;
  @ApiPropertyOptional({ enum: ['MONTHLY', 'ANNUAL'] }) @IsOptional() @IsEnum(['MONTHLY', 'ANNUAL']) billingCycle?: 'MONTHLY' | 'ANNUAL';
}

export class AvailableCapacityQueryDto {
  @ApiProperty() @IsString() region: string;
  @ApiPropertyOptional() @IsOptional() @IsString() window?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() date?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vehicleType?: string;
}

export class CreateReservationDto {
  @ApiPropertyOptional() @IsOptional() @IsString() capacityId?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() date?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() region?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() window?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vehicleType?: string;
  @ApiProperty() @IsInt() @Min(1) @Type(() => Number) quantity: number;
  @ApiProperty() @IsString() pickupLocation: string;
  @ApiPropertyOptional() @IsOptional() @IsString() deliveryType?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() idempotencyKey?: string;
}

export class UpdateReservationDto {
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) @Type(() => Number) quantity?: number;
}

export class CreateSlotDto {
  @ApiProperty() @IsString() title: string;
  @ApiProperty() @IsDateString() date: string;
  @ApiProperty() @IsString() window: string;
  @ApiPropertyOptional() @IsOptional() @IsString() startTime?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() endTime?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) @Type(() => Number) quantity?: number;
  @ApiProperty() @IsString() pickupLocation: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isRecurring?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() recurrence?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() reservationId?: string;
}

export class BookSlotDto {
  @ApiPropertyOptional() @IsOptional() @IsString() reservationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) @Type(() => Number) quantity?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() region?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() idempotencyKey?: string;
}

export class CreatePoolDto {
  @ApiPropertyOptional() @IsOptional() @IsString() name?: string;
  @ApiProperty() @IsString() region: string;
  @ApiProperty() @IsDateString() date: string;
  @ApiProperty() @IsString() window: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vehicleType?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) @Type(() => Number) maxDeliveries?: number;
}

export class JoinPoolDto {
  @ApiPropertyOptional() @IsOptional() @IsString() deliveryId?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) @Type(() => Number) quantity?: number;
  @ApiProperty() @IsString() pickupAddress: string;
  @ApiProperty() @IsString() destinationRegion: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) packageWeightKg?: number;
}

export class PurchaseCreditsDto {
  @ApiProperty() @IsInt() @Min(1) @Type(() => Number) credits: number;
  @ApiPropertyOptional() @IsOptional() @IsString() idempotencyKey?: string;
}

export class VerifyCreditsDto {
  @ApiProperty() @IsString() paymentReference: string;
}

export class AiRecommendDto {
  @ApiPropertyOptional() @IsOptional() @IsString() region?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() destinationRegion?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() window?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() date?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Type(() => Number) packageWeightKg?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) @Type(() => Number) quantity?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() deliveryId?: string;
}

export class AdminAdjustCreditsDto {
  @ApiProperty() @IsString() businessId: string;
  @ApiProperty() @IsInt() @Type(() => Number) amount: number;
  @ApiProperty() @IsString() reason: string;
}
export class AdminUpsertPlanDto {
  @ApiProperty() @IsString() name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Type(() => Number) monthlyPriceKobo?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Type(() => Number) annualPriceKobo?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Type(() => Number) monthlyDeliveryVolume?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Type(() => Number) reservedCapacityAllowance?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Type(() => Number) maxActiveSlots?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() poolingEligible?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Type(() => Number) discountPercent?: number;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() analyticsAccess?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() aiDispatchAccess?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() priorityAllocation?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) @Type(() => Number) maxLocations?: number;
}
export class AdminCapacityDto {
  @ApiProperty() @IsDateString() date: string;
  @ApiProperty() @IsString() region: string;
  @ApiProperty() @IsString() window: string;
  @ApiPropertyOptional() @IsOptional() @IsString() vehicleType?: string;
  @ApiProperty() @IsInt() @Min(0) @Type(() => Number) totalCapacity: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Type(() => Number) pricePerSlotCredits?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) @Type(() => Number) pricePerSlotKobo?: number;
}
export class AdminBusinessStatusDto { @ApiProperty({ enum: ['ACTIVE','SUSPENDED'] }) @IsEnum(['ACTIVE','SUSPENDED']) status: 'ACTIVE'|'SUSPENDED'; }
