import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskTypeDto {
  @ApiProperty()
  readonly name: string;
}
