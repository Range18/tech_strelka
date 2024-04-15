import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  firstname?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  surname?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  lastname?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  password?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  login?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  role?: number;
}
