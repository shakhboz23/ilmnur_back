import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: '+998901234567',
    description: 'Phone number of student',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1',
    description: 'Id of student',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
