import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDeliveryDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  senderName?: string;

    @ApiProperty()
  @IsOptional()
    @IsString()
    userId?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  senderPhone?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  senderAddress?: string;


    @ApiProperty()
  @IsOptional()
    @IsString()
    senderLatitude?: string;

        @ApiProperty()
  @IsOptional()
    @IsString()
    senderLongitude?: string;


   @ApiProperty()
  @IsOptional()
  @IsString()
  receiverName?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  receiverPhone?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  receiverAddress?: string;

     @ApiProperty()
  @IsOptional()
  @IsString()
  receiverLatitude?: string;

       @ApiProperty()
  @IsOptional()
  @IsString()
  receiverLongitude?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  packageName?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  packageCategory?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  packageWeight?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  packageDimensions?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  packageValue?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  pickupDate?: string;

     @ApiProperty()
  @IsOptional()
  @IsString()
  courier_name?: string;

       @ApiProperty()
  @IsOptional()
  @IsString()
  courier_email?: string;

         @ApiProperty()
  @IsOptional()
  @IsString()
  courier_phone?: string;

           @ApiProperty()
  @IsOptional()
  @IsString()
  shipbubbleOrderId?: string;

             @ApiProperty()
  @IsOptional()
  @IsString()
  tracking_url?: string;

               @ApiProperty()
  @IsOptional()
  @IsString()
  package_amount?: string;

                 @ApiProperty()
  @IsOptional()
  @IsString()
  package_weight?: string;

                   @ApiProperty()
  @IsOptional()
  @IsString()
  shipping_fee?: string;

                     @ApiProperty()
  @IsOptional()
  @IsString()
  shipping_payment_type?: string;

                       @ApiProperty()
  @IsOptional()
  @IsString()
  shipping_payment_status?: string;

                       @ApiProperty({ required: false, default: 'CREATED' })
  @IsOptional()
  @IsString()
                       deliveryStatus?: string;

                        @ApiProperty()
                       @IsOptional()
                       @IsString()
  deliveryType?: string;

   @ApiProperty()
  @IsOptional()
  @IsString()
  deliveryInstructions?: string;

     @ApiProperty()
  @IsOptional()
  @IsString()
  paymentStatus?: string;

       @ApiProperty()
  @IsOptional()
  @IsNumber()
  insuranceAmount?: number;

  
       @ApiProperty()
  @IsOptional()
  @IsString()
  insurance_policy_condition?: string;

         @ApiProperty()
  @IsOptional()
  @IsNumber()
  insure_percentage?: number;

         @ApiProperty()
  @IsOptional()
  @IsNumber()
  insurance_cost?: number;

         @ApiProperty()
  @IsOptional()
  @IsString()
  insuranceCode?: string;

         @ApiProperty()
  @IsOptional()
  @IsString()
  insurerName?: string;
}
