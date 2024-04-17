import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly firstname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly surname: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ nullable: true, required: false })
  readonly lastname?: string;

  @IsString()
  @ApiProperty()
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  class: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly role: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly houseId: number;
}
