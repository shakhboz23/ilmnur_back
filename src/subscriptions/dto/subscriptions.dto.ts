import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { SubscribeActive } from '../models/subscriptions.models';
import { RoleName } from 'src/activity/models/activity.models';

export class SubscriptionsDto {
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
