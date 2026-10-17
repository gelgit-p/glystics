import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateDeliveryCheckoutDto {
  @ApiProperty({ example: '1500' })
  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/)
  amount!: string;

  @ApiProperty({ example: 'NGN' })
  @IsString()
  @IsNotEmpty()
  currency!: string;

  @ApiProperty({ example: 'shipbubble-request-token' })
  @IsString()
  @IsNotEmpty()
  request_token!: string;

  @ApiProperty({ example: 'courier-id' })
  @IsString()
  @IsNotEmpty()
  courier_id!: string;

  @ApiProperty({ example: 'EXPRESS_SAVER' })
  @IsString()
  @IsNotEmpty()
  service_code!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  insurance_code?: string;
}
