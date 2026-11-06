import { ApiProperty } from '@nestjs/swagger';
import { UserObject } from './user.type';

export class AuthResponse {
  @ApiProperty() accessToken: string;
  @ApiProperty() refreshToken: string;

  @ApiProperty({ type: () => UserObject })
  user: UserObject;
}
