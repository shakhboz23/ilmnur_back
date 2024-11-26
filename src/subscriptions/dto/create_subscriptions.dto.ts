import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { RoleName } from 'src/activity/models/activity.models';
import { RegisterUserDto } from 'src/user/dto/register.dto';

export class CreateSubscriptionsDto extends RegisterUserDto {
  @ApiProperty({
    example: 'student',
    description: 'role name',
  })
  @IsNotEmpty()
  @IsEnum(RoleName)
  role: RoleName;

  @ApiProperty({
    example: 1,
    description: 'Course id',
  })
  @IsNotEmpty()
  @IsNumber()
  course_id: number;
}
