import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class GroupDto {
  @ApiProperty({
    example: 'A',
    description: 'Group name',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'A',
    description: 'Group name',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
