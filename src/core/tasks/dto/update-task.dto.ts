import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ nullable: true, required: false })
  readonly title?: string;

  @ApiProperty({ nullable: true, required: false })
  readonly description?: string;

  @ApiProperty({ nullable: true, required: false })
  readonly expireAt?: Date;

  @ApiProperty({ nullable: true, required: false })
  readonly prize?: number;
}
