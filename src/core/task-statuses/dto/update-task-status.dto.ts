import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskStatusDto {
  @ApiProperty()
  status: string;
}
