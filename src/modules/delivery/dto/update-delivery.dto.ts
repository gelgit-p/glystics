import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDeliveryDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  senderName?: string;

    @ApiProperty()
  @IsOptional()
  @IsNumber()
  userId?: number;

   @ApiProperty()
  @IsOptional()
  @IsString()
  senderPhone?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  senderAddress?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  receiverName?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  receiverPhone?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  receiverAddress?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  packageName?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  packageCategory?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  packageWeight?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  packageDimensions?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  packageValue?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  pickupDate?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  deliveryType?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  deliveryInstructions?: string;
}
