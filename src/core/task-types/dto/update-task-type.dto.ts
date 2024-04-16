import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskTypeDto {
  @ApiProperty()
  readonly name: string;
}
