import { ApiProperty } from '@nestjs/swagger';

export class UserObject {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  emailConfirmed: boolean;

  @ApiProperty()
  createdAt: Date;
}
