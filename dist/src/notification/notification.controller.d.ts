import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationDto } from './dto/notification.dto';
import { NotificationService } from './notification.service';
export declare class NotificationController implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly notificationService;
    server: Server;
    constructor(notificationService: NotificationService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    create(notificationDto: NotificationDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        data: import("./models/notification.model").Notification;
        error?: undefined;
    } | {
        status: import("@nestjs/common").HttpStatus;
        error: any;
        data?: undefined;
    }>;
    created({ page }: {
        page: number;
    }): Promise<void>;
    findById(id: string, client: Socket): Promise<void>;
    update(id: string, notificationDto: NotificationDto, client: Socket): Promise<{
        status: import("@nestjs/common").HttpStatus;
        data: import("./models/notification.model").Notification;
        error?: undefined;
    } | {
        status: import("@nestjs/common").HttpStatus;
        error: any;
        data?: undefined;
    }>;
    deleteUser(id: string, client: Socket): Promise<{
        status: import("@nestjs/common").HttpStatus;
        data: string;
        error?: undefined;
    } | {
        status: import("@nestjs/common").HttpStatus;
        error: any;
        data?: undefined;
    }>;
}
