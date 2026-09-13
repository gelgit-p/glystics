import { ApiProperty, } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty({ 
    description: 'Unique token to prevent duplicate requests', 
    example: 'req_tx_987654321' 
  })
  message: string;


}
