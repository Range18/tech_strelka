import { Event } from '#src/core/events/entities/event.entity';
import { ApiProperty } from '@nestjs/swagger';
import { GetLevelRdo } from '#src/core/levels/dto/get-level.rdo';
import { backendServer } from '#src/common/configs/config';

export class GetEventRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  expireAt: Date;

  @ApiProperty()
  image?: string;

  @ApiProperty({ type: GetLevelRdo })
  level?: GetLevelRdo;

  @ApiProperty()
  name: string;

  @ApiProperty()
  prize: number;

  @ApiProperty()
  link: string;

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
    this.image = event.image
      ? `${backendServer.urlValue}/api/assets/${event.image.id}/file`
      : undefined;
    this.link = event.link;
    this.level = event.level ? new GetLevelRdo(event.level) : undefined;

    this.updatedAt = event.updatedAt;
    this.createdAt = event.createdAt;
  }
}
