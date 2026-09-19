import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

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
