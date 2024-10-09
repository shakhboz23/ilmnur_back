import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class RegisterTeacherDto {
  @ApiProperty({
    example: 'full name',
    description: 'The full name',
  })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    example: '+998991422303',
    description: 'The phone number',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'Mathematics',
    description: 'Subject',
  })
  @IsOptional()
  @IsString()
  subject: string;

  @ApiProperty({
    example: '7 A',
    description: 'Class',
  })
  @IsOptional()
  @IsString()
  class: string;

  @ApiProperty({
    example: 'Teacher',
    description: 'The role of the teacher',
  })
  @IsNotEmpty()
  @IsString()
  role: string;
}
