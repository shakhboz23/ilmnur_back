import { HttpStatus } from '@nestjs/common';
import { Notification } from './models/notification.model';
import { NotificationDto } from './dto/notification.dto';
export declare class NotificationService {
    private readonly notificationRepository;
    constructor(notificationRepository: typeof Notification);
    create(notificationDto: NotificationDto): Promise<{
        status: HttpStatus;
        data: Notification;
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        data?: undefined;
    }>;
    findAll(page: number): Promise<{
        status: HttpStatus;
        data: {
            records: Notification[];
            pagination: {
                currentPage: number;
                total_pages: number;
                total_count: number;
            };
        };
    } | {
        status: HttpStatus;
        error: any;
    }>;
    findAllId(): Promise<Notification[] | {
        status: HttpStatus;
        error: any;
    }>;
    findById(id: string): Promise<{
        status: HttpStatus;
        data: Notification;
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        data?: undefined;
    }>;
    update(id: string, notificationDto: NotificationDto): Promise<{
        status: HttpStatus;
        data: Notification;
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        data?: undefined;
    }>;
    delete(id: string): Promise<{
        status: HttpStatus;
        data: string;
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        data?: undefined;
    }>;
}
