import { Event } from '#src/core/events/entities/event.entity';
import { AssetEntity } from '#src/core/assets/entities/asset.entity';
import { Level } from '#src/core/levels/entities/level.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GetEventRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  expireAt: Date;

  @ApiProperty()
  image?: AssetEntity;

  @ApiProperty()
  level?: Level;

  @ApiProperty()
  name: string;

  @ApiProperty()
  prize: number;

  @ApiProperty()
  readonly updatedAt: Date;

  @ApiProperty()
  readonly createdAt: Date;

  constructor(event: Event) {
    this.id = event.id;
    this.name = event.name;
    this.description = event.description;
    this.prize = event.prize;
    this.expireAt = event.expireAt;
    this.level = event.level;

    this.updatedAt = event.updatedAt;
    this.createdAt = event.createdAt;
  }
}
