import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomConfirmationDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  studentStatus: string;

  @ApiProperty()
  levelId: number;

  @ApiProperty()
  status: string;
}
