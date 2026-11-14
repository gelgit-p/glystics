import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

const CAPACITY_STATUSES = ['DRAFT', 'PUBLISHED', 'FULL', 'PAUSED', 'EXPIRED', 'CANCELLED'] as const;
const RESERVATION_ACTIONS = ['ACCEPT', 'REJECT', 'START', 'COMPLETE', 'CANCEL'] as const;
const SHIPMENT_STATUSES = ['PENDING', 'PICKUP_SCHEDULED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'FAILED', 'RETURNED', 'CANCELLED'] as const;

export class UpsertProviderProfileDto {
  @IsString() @MaxLength(200) companyName!: string;
  @IsOptional() @IsString() registrationNumber?: string;
  @IsString() contactName!: string;
  @IsString() businessEmail!: string;
  @IsString() phoneNumber!: string;
  @IsString() businessAddress!: string;
  @IsArray() @IsString({ each: true }) operatingRegions!: string[];
  @IsArray() @IsString({ each: true }) servicesOffered!: string[];
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) fleetSize?: number;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() payoutBankName?: string;
  @IsOptional() @IsString() payoutAccountName?: string;
  // Full payout account number; stored as digits only (spaces/dashes stripped).
  @IsOptional() @IsString() payoutAccountNumber?: string;
}

export class AddDocumentDto {
  @IsString() name!: string;
  @IsString() url!: string;
}

export class CreateZoneDto {
  @IsString() name!: string;
  @IsString() region!: string;
  @IsString() state!: string;
  @IsString() city!: string;
  @IsString() pickupLocation!: string;
  @IsArray() @IsString({ each: true }) supportedDestinations!: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) restrictedLocations?: string[];
  @Type(() => Number) @IsInt() @Min(0) deliveryPriceKobo!: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) distantSurchargeKobo?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) estimatedDeliveryHours?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) minPackages?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) maxPackages?: number;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) maxWeightKg?: number;
  @IsOptional() @IsArray() @IsString({ each: true }) supportedSizes?: string[];
}
export class UpdateZoneDto extends CreateZoneDto {
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class CreateCapacityDto {
  @IsOptional() @IsString() zoneId?: string;
  @IsString() title!: string;
  @IsString() region!: string;
  @IsString() state!: string;
  @IsString() city!: string;
  @IsArray() @IsString({ each: true }) pickupZones!: string[];
  @IsArray() @IsString({ each: true }) destinationZones!: string[];
  @Type(() => Number) @IsInt() @Min(1) totalCapacity!: number;
  @IsOptional() @IsString() unit?: string;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) maxWeightKg?: number;
  @IsOptional() @IsString() maxDimensions?: string;
  @IsString() deliveryDate!: string;
  @IsString() pickupStartTime!: string;
  @IsString() pickupEndTime!: string;
  @IsString() deliveryTimeframe!: string;
  @Type(() => Number) @IsInt() @Min(0) pricePerPackageKobo!: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) minReservationQty?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) maxReservationQty?: number;
  @IsOptional() @IsString() reservationDeadline?: string;
  @IsOptional() @IsString() cancellationPolicy?: string;
  @IsOptional() @IsString() instructions?: string;
  @IsOptional() @IsBoolean() isRecurring?: boolean;
  @IsOptional() @IsString() recurrence?: string;
  @IsOptional() @IsIn(CAPACITY_STATUSES) status?: (typeof CAPACITY_STATUSES)[number];
}
export class UpdateCapacityDto extends CreateCapacityDto {}

export class CapacityStatusDto {
  @IsIn(['PUBLISH', 'PAUSE', 'RESUME', 'CANCEL']) action!: 'PUBLISH' | 'PAUSE' | 'RESUME' | 'CANCEL';
}

export class CreateProviderReservationDto {
  @IsString() capacityId!: string;
  @Type(() => Number) @IsInt() @Min(1) quantity!: number;
  @IsString() pickupLocation!: string;
  @IsString() destinationZone!: string;
  @IsOptional() @IsString() specialInstructions?: string;
  @IsOptional() @IsString() idempotencyKey?: string;
}

export class ReservationActionDto {
  @IsIn(RESERVATION_ACTIONS) action!: (typeof RESERVATION_ACTIONS)[number];
  @IsOptional() @IsString() reason?: string;
  @IsOptional() @IsString() note?: string;
}

export class CreateShipmentDto {
  @IsString() reservationId!: string;
  @IsOptional() @IsString() deliveryId?: string;
  @IsOptional() @IsString() riderId?: string;
  @IsString() senderName!: string;
  @IsString() receiverName!: string;
  @IsString() receiverPhone!: string;
  @IsString() pickupAddress!: string;
  @IsString() deliveryAddress!: string;
  @IsOptional() @IsString() packageDescription?: string;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) packageWeightKg?: number;
  @IsOptional() @IsString() packageDimensions?: string;
  @IsOptional() @IsString() deliveryInstructions?: string;
}

export class UpdateShipmentDto {
  @IsOptional() @IsIn(SHIPMENT_STATUSES) status?: (typeof SHIPMENT_STATUSES)[number];
  @IsOptional() @IsString() riderId?: string;
  @IsOptional() @IsString() deliveryNote?: string;
  @IsOptional() @IsString() proofOfDeliveryUrl?: string;
  @IsOptional() @IsString() attemptNote?: string;
  @IsOptional() @IsString() trackingReference?: string;
}

export class CreateRiderDto {
  @IsString() name!: string;
  @IsString() phoneNumber!: string;
  @IsOptional() @IsString() vehicleType?: string;
  @IsOptional() @IsString() vehicleRegistration?: string;
}
export class UpdateRiderDto extends CreateRiderDto {
  @IsOptional() @IsBoolean() isAvailable?: boolean;
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class CreateVehicleDto {
  @IsString() type!: string;
  @IsString() registration!: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) capacityPackages?: number;
}

export class RequestPayoutDto {
  @Type(() => Number) @IsInt() @Min(1) amountKobo!: number;
  @IsOptional() @IsString() note?: string;
}

export class AdminVerificationDto {
  @IsIn(['VERIFIED', 'REJECTED', 'SUSPENDED', 'PENDING_VERIFICATION']) status!: 'VERIFIED' | 'REJECTED' | 'SUSPENDED' | 'PENDING_VERIFICATION';
  @IsOptional() @IsString() note?: string;
}

export class AdminCommissionDto {
  @Type(() => Number) @IsNumber() @Min(0) commissionPercent!: number;
}
