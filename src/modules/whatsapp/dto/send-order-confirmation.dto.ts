import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendOrderConfirmationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  trackingId: string;

  @ApiProperty({ example: 'en_US' })
  @IsString()
  @IsNotEmpty()
  templateLanguage: string;
}
