import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

@InputType()
export class SignupInput {
  @ApiProperty()
  @Field()
  email: string;


  @ApiProperty()
  @Field() password: string;

  @ApiProperty()
  @Field() businessName: string;

  @ApiProperty()
  @Field() fullName: string;
}


export class UpdateInput {
  @ApiProperty()
  @Field()
  @IsOptional()
  email: string;


  @ApiProperty()
  @IsOptional()
  @Field() password: string;

  @ApiProperty()
  @IsOptional()
  @Field() businessName: string;

  @ApiProperty()
  @IsOptional()
  @Field() fullName: string;


  @ApiProperty()
  @Field()
  @IsOptional()
  appId: string;


  @ApiProperty()
  @Field()
  @IsOptional()
  appSecret: string;


  @ApiProperty()
  @Field()
  @IsOptional()
  facebookAcceessToken: string;

  @ApiProperty()
  @Field()
  @IsOptional()
  grantedScopes: string;

  @ApiProperty()
  @Field()
  @IsOptional()
  accessTokenExpiresIn: string;

  @ApiProperty()
  @Field()
  @IsOptional()
  facebookConnectStatus: boolean;


}
