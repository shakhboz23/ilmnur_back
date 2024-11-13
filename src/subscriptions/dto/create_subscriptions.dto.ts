import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { RegisterUserDto } from 'src/user/dto/register.dto';

export class CreateSubscriptionsDto extends RegisterUserDto {
  @ApiProperty({
    example: 1,
    description: 'Course id',
  })
  @IsNotEmpty()
  @IsNumber()
  course_id: number;
}
