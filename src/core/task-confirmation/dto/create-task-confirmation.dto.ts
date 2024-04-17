import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskConfirmationDto {
  @ApiProperty()
  readonly task?: number;
}
