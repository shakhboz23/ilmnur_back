import { RoleName } from 'src/activity/models/activity.models';
import { RegisterUserDto } from 'src/user/dto/register.dto';
export declare class CreateSubscriptionsDto extends RegisterUserDto {
    role: RoleName;
    course_ids: number[];
}
