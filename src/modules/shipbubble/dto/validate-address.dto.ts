import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class ValidateAddressDto {
  @ApiProperty({ 
    description: 'Full name of the contact person at the address', 
    example: 'John Doe' 
  })
  name: string;

  @ApiProperty({ 
    description: 'Email address for delivery notifications', 
    example: 'john.doe@example.com' 
  })
  email: string;

  @ApiProperty({ 
    description: 'Contact phone number (preferably in E.164 format)', 
    example: '+1234567890' 
  })
  phone: string;

  @ApiProperty({ 
    description: 'Full street address to be validated', 
    example: '1600 Amphitheatre Pkwy, Mountain View, CA 94043' 
  })
  address: string;

  @ApiPropertyOptional({ 
    description: 'GPS Latitude coordinate of the location', 
    example: 37.4220 
  })
  latitude?: number;

  @ApiPropertyOptional({ 
    description: 'GPS Longitude coordinate of the location', 
    example: -122.0841 
  })
  longitude?: number;
}

// 💡 PartialType automatically copies all properties from ValidateAddressDto 
// and marks them as optional for both Swagger UI and class-validator.
export class UpdateValidatedAddressDto extends PartialType(ValidateAddressDto) {}
