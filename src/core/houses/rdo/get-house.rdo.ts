import { HouseEntity } from '#src/core/houses/entity/house.entity';
import { ApiProperty } from '@nestjs/swagger';
import { GetFileRdo } from '#src/core/assets/rdo/get-file.rdo';

export class GetHouseRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty({ nullable: true })
  readonly description?: string;

  @ApiProperty()
  readonly usersCount: number;

  @ApiProperty()
  readonly totalPoints: number;

  @ApiProperty({ nullable: true })
  readonly ourValues?: string;

  @ApiProperty({ nullable: true, type: GetFileRdo })
  readonly image?: GetFileRdo;

  constructor(house: HouseEntity) {
    this.id = house.id;
    this.name = house.name;
    this.description = house.description;
    this.usersCount = house.users ? house.users?.length : 0;
    this.ourValues = house.ourValues;
    this.totalPoints = house.totalPoints;
    this.image = house.image ? new GetFileRdo(house.image) : undefined;
  }
}
