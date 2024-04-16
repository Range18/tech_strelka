import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  readonly title: string;

  @ApiProperty({ nullable: true, required: false })
  readonly description?: string;

  @ApiProperty({ nullable: true, required: false })
  readonly expireAt?: Date;

  @ApiProperty()
  readonly prize: number;

  @ApiProperty({ default: false })
  readonly isForTeam: boolean;
}
