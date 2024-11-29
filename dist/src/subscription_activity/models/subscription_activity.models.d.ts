import { Model } from 'sequelize-typescript';
import { Subscriptions } from 'src/subscriptions/models/subscriptions.models';
import { Course } from 'src/course/models/course.models';
interface SubscriptionActivityAttributes {
    subscription_id: number;
    status: SubscriptionActivityStatus;
    course_id: number;
    createdAt?: Date;
}
export declare enum SubscriptionActivityStatus {
    none = "none",
    bad = "bad",
    good = "good",
    average = "average",
    excellent = "excellent"
}
export declare class SubscriptionActivity extends Model<SubscriptionActivity, SubscriptionActivityAttributes> {
    id: number;
    status: SubscriptionActivityStatus;
    createdAt: Date;
    subscription_id: number;
    subcription: Subscriptions[];
    course_id: number;
    course: Course[];
}
export {};
