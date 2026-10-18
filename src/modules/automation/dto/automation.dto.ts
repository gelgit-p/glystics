import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAutomationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  trigger!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  triggerValue?: string | null;

  @ApiProperty({ description: 'Selected WhatsApp template name' })
  @IsString()
  @IsNotEmpty()
  action!: string;

  @ApiProperty({ description: 'Selected WhatsApp template Meta ID' })
  @IsString()
  @IsNotEmpty()
  actionTemplate!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}


export class UpdateAutomationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  trigger?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  triggerValue?: string | null;

  @ApiPropertyOptional({ description: 'Selected WhatsApp template name' })
  @IsOptional()
  @IsString()
  action?: string;

  @ApiPropertyOptional({ description: 'Selected WhatsApp template Meta ID' })
  @IsOptional()
  @IsString()
  actionTemplate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}