import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class AdminListQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;
}

export class AdminSetRoleDto {
  @ApiProperty({ enum: ['USER', 'SUPER_ADMIN', 'LOGISTICS_PROVIDER'] })
  @IsIn(['USER', 'SUPER_ADMIN', 'LOGISTICS_PROVIDER'])
  role!: 'USER' | 'SUPER_ADMIN' | 'LOGISTICS_PROVIDER';
}

export class AdminSetSuspendedDto {
  @ApiProperty()
  @IsBoolean()
  suspended!: boolean;
}

export class AdminSetDetectionDto {
  @ApiProperty()
  @IsBoolean()
  aiDeliveryDetectionEnabled!: boolean;
}

export class AdminAdjustCreditsDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  amount!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}

export class AdminUpdateDeliveryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  deliveryStatus?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bookingStatus?: string;
}

export class AdminToggleAutomationDto {
  @ApiProperty()
  @IsBoolean()
  enabled!: boolean;
}
