import { ApiProperty } from '@nestjs/swagger';

export const webhookStatuses = [
  'pending',
  'confirmed',
  'picked_up',
  'in_transit',
  'completed',
  'cancelled',
] as const;

export type WebhookStatus = (typeof webhookStatuses)[number];

export class WebhookSimulatorDto {
  @ApiProperty({ 
    description: 'The target webhook execution status code to simulate', 
    enum: webhookStatuses, // 👈 Generates a convenient dropdown in Swagger UI
    example: 'in_transit' 
  })
  status_code: WebhookStatus;
}
