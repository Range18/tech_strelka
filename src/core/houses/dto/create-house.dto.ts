import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateHouseDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly ourValues?: string;
}
