import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { GetHouseRdo } from '#src/core/houses/rdo/get-house.rdo';
import { UserEntity } from '#src/core/users/user.entity';

export class LoggedUserRdo {
  @ApiProperty()
  readonly accessToken: string;

  @Exclude()
  readonly sessionExpireAt: Date;

  @ApiProperty()
  readonly login: string;

  @ApiProperty()
  readonly house?: GetHouseRdo;

  constructor(accessToken: string, sessionExpireAt: Date, user: UserEntity) {
    this.accessToken = accessToken;
    this.sessionExpireAt = sessionExpireAt;
    this.login = user.login;
    this.house = user.house ? new GetHouseRdo(user.house) : undefined;
  }
}
