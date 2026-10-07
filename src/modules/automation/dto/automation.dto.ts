import { ApiProperty } from "@nestjs/swagger";

export class CreateAutomationDto {
    @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  trigger: string;

  @ApiProperty()
  triggerValue?: string;

  @ApiProperty()
  action?: string;

  @ApiProperty()
  actionTemplate: string;

  @ApiProperty()
  enabled?: boolean;
}


export class UpdateAutomationDto {
    @ApiProperty()
  name?: string;

  @ApiProperty()
  trigger?: string;

  @ApiProperty()
  triggerValue?: string;

  @ApiProperty()
  action?: string;

  @ApiProperty()
  actionTemplate?: string;

  @ApiProperty()
  enabled?: boolean;
}