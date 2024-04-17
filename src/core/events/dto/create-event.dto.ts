import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  expireAt: Date;

  @ApiProperty()
  levelId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  prize: number;
}
