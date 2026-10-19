import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SpendCreditsDto {
  @ApiProperty({ enum: ['DELIVERY', 'WHATSAPP'] })
  @IsIn(['DELIVERY', 'WHATSAPP'])
  service: 'DELIVERY' | 'WHATSAPP';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  idempotencyKey: string;
}

export class RefundCreditsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  usageTransactionId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}