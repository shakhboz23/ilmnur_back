import { Model } from 'sequelize-typescript';
import { Group } from '../../group/models/group.models';
import { Lesson } from '../../lesson/models/lesson.models';
import { Subscriptions } from 'src/subscriptions/models/subscriptions.models';
import { Category } from 'src/category/models/category.models';
import { User } from 'src/user/models/user.models';
import { SubscriptionActivity } from 'src/subscription_activity/models/subscription_activity.models';
interface CourseAttributes {
    title: string;
    description: string;
    price: number;
    discount: number;
    cover: string;
    group_id: number;
    category_id: number;
    user_id: number;
}
export declare class Course extends Model<Course, CourseAttributes> {
    id: number;
    title: string;
    description: string;
    price: number;
    discount: number;
    cover: string;
    group_id: number;
    group: Group[];
    user_id: number;
    user: User[];
    category_id: number;
    category: Category[];
    lessons: Lesson[];
    subscriptions: Subscriptions[];
    subscriptionActivity: SubscriptionActivity;
}
export {};
