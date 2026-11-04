import { InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

@InputType()
export class SignupInput {
  @ApiProperty()
  @IsEmail()
  email: string;


  @ApiProperty()
  @IsString() password: string;

  @ApiProperty()
  @IsString() businessName: string;

  @ApiProperty()
  @IsString() fullName: string;
}


export class UpdateInput {
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;


  @ApiProperty()
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  businessName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fullName: string;


  @ApiProperty()
  @IsString()
  @IsOptional()
  appId: string;


  @ApiProperty()
  @IsString()
  @IsOptional()
  appSecret: string;


  @ApiProperty()
  @IsString()
  @IsOptional()
  facebookAcceessToken: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  grantedScopes: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  accessTokenExpiresIn: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  facebookConnectStatus: boolean;

    @ApiProperty()
  @IsString()
  @IsOptional()
  selectedWabaId: string;

      @ApiProperty()
  @IsString()
  @IsOptional()
  selectedFacebookBusinessId: string;

        @ApiProperty()
  @IsString()
  @IsOptional()
  selectedFacebookBusinessName: string;

          @ApiProperty()
  @IsString()
  @IsOptional()
  selectedPhoneNumberQualityRating: string;

          @ApiProperty()
  @IsString()
  @IsOptional()
  selectedPhoneNumberVerifiedName: string;

  @ApiProperty({
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  selectedPhoneNumberId?: string[];
}
