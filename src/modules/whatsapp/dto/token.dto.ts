import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from 'class-validator';

export class TokenDto {
        @ApiProperty()
     @IsOptional()
  userId: string;

    @ApiProperty()
     @IsOptional()
  facebookAccessToken?: string;


  @ApiProperty()
  @IsOptional()
  facebookLongLivedAccessToken: string;
}

