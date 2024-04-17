import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskConfirmationDto {
  @ApiProperty()
  status: string;

  @ApiProperty({
    nullable: true,
    required: false,
    description: 'Если проверка задания внешкольного',
  })
  prize?: string;
}
