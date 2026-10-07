import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class ValidateAddressDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  latitude?: number;

  @ApiProperty()
  longitude?: number;
}

// 💡 PartialType automatically copies all properties from ValidateAddressDto 
// and marks them as optional for both Swagger UI and class-validator.
export class UpdateValidatedAddressDto extends PartialType(ValidateAddressDto) {}
