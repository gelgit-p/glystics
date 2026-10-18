import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BuyCreditsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  packageId: string;
}