import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class LoginInput {
  @Field() 
  @ApiProperty() email: string;

  
  @Field()
  @ApiProperty()
   password: string;
}
