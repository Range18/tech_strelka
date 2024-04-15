import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskStatusDto {
  @ApiProperty()
  readonly task: number;

  @ApiProperty()
  readonly user: number;

  @ApiProperty()
  status: string;
}
