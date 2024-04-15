import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty()
  readonly accessToken: string;

  @Exclude()
  readonly sessionExpireAt: Date;

  @ApiProperty()
  readonly login: string;

  constructor(accessToken: string, sessionExpireAt: Date, login: string) {
    this.accessToken = accessToken;
    this.sessionExpireAt = sessionExpireAt;
    this.login = login;
  }
}
