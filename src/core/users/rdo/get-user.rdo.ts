import { UserEntity } from '#src/core/users/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEntity } from '#src/core/roles/entity/roles.entity';
import { GetHouseRdo } from '#src/core/houses/rdo/get-house.rdo';

export class GetUserRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly firstname: string;

  @ApiProperty()
  readonly surname: string;

  @ApiProperty({ nullable: true })
  readonly lastname: string;

  @ApiProperty()
  readonly login: string;

  @ApiProperty({ type: () => RolesEntity })
  readonly role: RolesEntity;

  @ApiProperty({ nullable: true, type: GetHouseRdo })
  readonly house?: GetHouseRdo;

  @ApiProperty()
  readonly points: number;

  @ApiProperty()
  readonly updatedAt: Date;

  @ApiProperty()
  readonly createdAt: Date;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.surname = user.surname;
    this.lastname = user.lastname;
    this.login = user.login;
    this.role = user.role;
    this.house = user.house ? new GetHouseRdo(user.house) : undefined;

    this.points = user.points;

    this.updatedAt = user.updatedAt;
    this.createdAt = user.createdAt;
  }
}
