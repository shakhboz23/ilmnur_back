import { User } from '../../user/models/user.models';
import { Model } from 'sequelize-typescript';
import { Course } from '../../course/models/course.models';
import { SubscriptionActivity } from 'src/subscription_activity/models/subscription_activity.models';
import { RoleName } from 'src/activity/models/activity.models';
interface SubscriptionsAttributes {
    course_id: number;
    user_id: number;
    role: RoleName;
    is_active: SubscribeActive;
}
export declare enum SubscribeActive {
    requested = "requested",
    active = "active",
    pending = "pending"
}
export declare class Subscriptions extends Model<Subscriptions, SubscriptionsAttributes> {
    id: number;
    role: RoleName;
    course_id: number;
    user_id: number;
    course: Course[];
    user: User[];
    is_active: SubscribeActive;
    subscriptionActivity: SubscriptionActivity;
}
export {};
