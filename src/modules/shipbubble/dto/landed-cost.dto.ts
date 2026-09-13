import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LandedCostDto {
      @ApiPropertyOptional({ 
    description: 'request_token', 
  })
	request_token: string;

          @ApiPropertyOptional({ 
    description: 'request_token', 
  })
	store_checkout_currency?: string;
}
