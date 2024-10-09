import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { RoleDto } from 'src/role/dto/role.dto';

export class RegisterUserDto extends RoleDto {
  @ApiProperty({
    example: 'John',
    description: 'Name of user',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Smith',
    description: 'Surname of user',
  })
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty({
    example: 'shahbozmamatkarimov2303@gmail.com',
    description: 'Email of user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'shahbozmamatkarimov2303@gmail.com',
    description: 'Email of user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
