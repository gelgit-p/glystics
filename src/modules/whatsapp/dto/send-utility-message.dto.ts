import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UtilityMessageParameterDto {
  @ApiProperty({ enum: ['text', 'image', 'video', 'document'] })
  type: 'text' | 'image' | 'video' | 'document';

  @ApiPropertyOptional()
  parameter_name?: string;

  @ApiPropertyOptional()
  text?: string;

  @ApiPropertyOptional({ type: Object })
  image?: { id?: string; link?: string };

  @ApiPropertyOptional({ type: Object })
  video?: { id?: string; link?: string };

  @ApiPropertyOptional({ type: Object })
  document?: { id?: string; link?: string; filename?: string };
}

export class UtilityMessageComponentDto {
  @ApiProperty({ enum: ['header', 'body'] })
  type: 'header' | 'body';

  @ApiProperty({ type: [UtilityMessageParameterDto] })
  parameters: UtilityMessageParameterDto[];
}

export class SendUtilityMessageDto {
  @ApiPropertyOptional({ description: 'User whose WhatsApp credentials should be used' })
  userId?: string;

  @ApiProperty({ description: 'Recipient phone number in international format' })
  to: string;

  @ApiProperty()
  templateName: string;

  @ApiProperty({ description: 'Template language code, for example en_US' })
  templateLanguage: string;

  @ApiPropertyOptional({ type: [UtilityMessageComponentDto] })
  components?: UtilityMessageComponentDto[];
}
