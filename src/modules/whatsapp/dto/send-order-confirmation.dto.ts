import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendOrderConfirmationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  trackingId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  templateLanguage!: string;
}
