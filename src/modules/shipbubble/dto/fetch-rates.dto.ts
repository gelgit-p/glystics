import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PackageItemDto {
  @ApiProperty({ description: 'Name of the item', example: 'Wireless Headphones' })
  name: string;

  @ApiProperty({ description: 'Short description of the item', example: 'Electronics - Audio device' })
  description: string;

  @ApiProperty({ description: 'Weight per unit (include unit of measure if applicable)', example: '0.5kg' })
  unit_weight: string;

  @ApiProperty({ description: 'Monetary value per unit', example: '99.99' })
  unit_amount: string;

  @ApiProperty({ description: 'Total quantity of this item', example: 2 })
  quantity: number;
}

export class PackageDimensionDto {
  @ApiProperty({ description: 'Length of the package', example: 10 })
  length: number;

  @ApiProperty({ description: 'Width of the package', example: 8 })
  width: number;

  @ApiProperty({ description: 'Height of the package', example: 6 })
  height: number;
}

export class FetchRatesDto {
  @ApiProperty({ description: 'Unique code for the sender address book entry', example: 101 })
  sender_address_code: number;

  @ApiProperty({ description: 'Unique code for the receiver address book entry', example: 202 })
  reciever_address_code: number;

  @ApiProperty({ description: 'Scheduled date for package pickup (YYYY-MM-DD)', example: '2026-10-15' })
  pickup_date: string;

  @ApiProperty({ description: 'ID referencing the item category classification', example: 5 })
  category_id: number;

  @ApiProperty({ 
    description: 'List of individual items contained inside the package',
    type: () => PackageItemDto, 
    isArray: true 
  })
  package_items: PackageItemDto[];

  @ApiProperty({ 
    description: 'Physical dimensions of the shipping container',
    type: () => PackageDimensionDto 
  })
  package_dimension: PackageDimensionDto;

  @ApiPropertyOptional({ description: 'Preferred shipping tier or method', example: 'EXPRESS' })
  service_type?: string;

  @ApiPropertyOptional({ description: 'Special delivery instructions for the courier', example: 'Leave at the front door.' })
  delivery_instructions?: string;
}
