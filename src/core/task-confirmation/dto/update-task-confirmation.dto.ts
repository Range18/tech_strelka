import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskConfirmationDto {
  @ApiProperty()
  status: string;
}
