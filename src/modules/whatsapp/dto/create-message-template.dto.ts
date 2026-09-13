import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MessageTemplateHeaderExampleDto {
  @ApiPropertyOptional({ type: [String] })
  header_handle?: string[];
}

export class MessageTemplateBodyExampleParamDto {
  @ApiProperty()
  param_name: string;

  @ApiProperty()
  example: string;
}

export class MessageTemplateBodyExampleDto {
  @ApiPropertyOptional({ type: [MessageTemplateBodyExampleParamDto] })
  body_text_named_params?: MessageTemplateBodyExampleParamDto[];
}

export class MessageTemplateComponentDto {
  @ApiProperty({ enum: ['header', 'body', 'footer', 'buttons'] })
  type: 'header' | 'body' | 'footer' | 'buttons';

  @ApiPropertyOptional()
  format?: string;

  @ApiPropertyOptional()
  text?: string;

  @ApiPropertyOptional({ type: MessageTemplateHeaderExampleDto })
  example?: MessageTemplateHeaderExampleDto | MessageTemplateBodyExampleDto;

  @ApiPropertyOptional({ type: [Object] })
  buttons?: Record<string, unknown>[];
}

export class CreateMessageTemplateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  language: string;

  @ApiProperty({ enum: ['marketing', 'utility', 'authentication'] })
  category: 'marketing' | 'utility' | 'authentication';

  @ApiPropertyOptional()
  parameter_format?: string;

  @ApiProperty({ type: [MessageTemplateComponentDto] })
  components: MessageTemplateComponentDto[];
}
