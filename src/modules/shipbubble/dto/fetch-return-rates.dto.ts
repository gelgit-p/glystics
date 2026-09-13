import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FetchReturnRatesDto {
  @ApiProperty({ 
    description: 'Scheduled date for the return package pickup (YYYY-MM-DD)', 
    example: '2026-10-15' 
  })
  pickup_date: string;

  @ApiPropertyOptional({ 
    description: 'Special delivery instructions for the courier', 
    example: 'Leave near the garage doors.' 
  })
  delivery_instructions?: string;

  @ApiPropertyOptional({ 
    description: 'Contact phone number for the sender', 
    example: '+1234567890' 
  })
  sender_phone?: string;

  @ApiPropertyOptional({ 
    description: 'Contact phone number for the receiver', 
    example: '+1987654321' 
  })
  reciever_phone?: string;
}
