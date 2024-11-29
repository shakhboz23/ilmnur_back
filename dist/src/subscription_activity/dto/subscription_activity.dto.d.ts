import { SubscriptionActivityStatus } from '../models/subscription_activity.models';
export declare class SubscriptionActivityDto {
    subscription_id: number;
    course_id: number;
    status: SubscriptionActivityStatus;
    date: Date;
}
