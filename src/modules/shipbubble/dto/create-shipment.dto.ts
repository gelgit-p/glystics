import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateShipmentDto {
  @ApiProperty({ 
    description: 'Unique token to prevent duplicate requests', 
    example: 'req_tx_987654321' 
  })
  request_token: string;

  @ApiProperty({ 
    description: 'The shipping service tier code', 
    example: 'EXPRESS_SAVER' 
  })
  service_code: string;

  @ApiProperty({ 
    description: 'The unique identifier of the shipping carrier', 
    example: 'dhl_express' 
  })
  courier_id: string;

  @ApiPropertyOptional({ 
    description: 'Optional insurance policy or coverage tier code', 
    example: 'INS_LVL_2' 
  })
  insurance_code?: string;

  @ApiPropertyOptional({ 
    description: 'Flag indicating if this is a Cash on Delivery shipment', 
    type: Boolean, 
    example: false 
  })
  is_cod_label?: boolean;

  @ApiPropertyOptional({ 
    description: 'Flag indicating if customs duties are prepaid by the sender', 
    type: Boolean, 
    example: true 
  })
  duties_paid?: boolean;
}
