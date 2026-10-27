import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateDraftDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  senderName?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  senderPhone?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  senderAddress?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  senderEmail?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  receiverName?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  receiverPhone?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  receiverAddress?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  receiverEmail?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  packageName?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  packageDescription?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  packageCategory?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() packageCategoryId?: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  packageWeight?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  packageValue?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() packageQuantity?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() length?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() width?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() height?: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  pickupDate?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  deliveryType?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  deliveryInstructions?: string;
}

export class ApproveDraftDto {
  @ApiProperty() @IsString() @IsNotEmpty() quoteId!: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
  @ApiPropertyOptional({
    description:
      'Caller-supplied idempotency key; server derives one from draft+quote if omitted',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  idempotencyKey?: string;
}

export class UpdateAiSettingsDto {
  @ApiProperty()
  @IsBoolean()
  aiDeliveryDetectionEnabled!: boolean;
}

export class AdminSetRoleDto {
  @ApiProperty({ enum: ['USER', 'SUPER_ADMIN'] })
  @IsIn(['USER', 'SUPER_ADMIN'])
  role!: 'USER' | 'SUPER_ADMIN';
}

export class AdminSetDetectionDto {
  @ApiProperty()
  @IsBoolean()
  aiDeliveryDetectionEnabled!: boolean;
}

export class RejectDraftDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}

export class SimulateInboundDto {
  @ApiProperty({
    description: 'DEMO ONLY: simulates a customer WhatsApp text message',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  text!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() customerWaId?: string;
  @ApiPropertyOptional() @IsOptional() @IsIn(['text']) type?: string;
}
