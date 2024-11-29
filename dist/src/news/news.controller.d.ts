import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NewsDto } from './dto/news.dto';
import { NewsService } from './news.service';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
export declare class NewsController implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly newsService;
    private readonly roleService;
    private readonly userService;
    server: Server;
    constructor(newsService: NewsService, roleService: RoleService, userService: UserService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    create(newsDto: NewsDto, req: any): Promise<{
        status: import("@nestjs/common").HttpStatus;
        data: import("./models/news.model").News;
        error?: undefined;
    } | {
        status: import("@nestjs/common").HttpStatus;
        error: any;
        data?: undefined;
    }>;
    getGroupNews({ newsgroup_id, page }: {
        newsgroup_id: number;
        page: number;
    }, client: Socket): Promise<void>;
    findById(id: string, client: Socket): Promise<void>;
    findAll(): Promise<{
        status: import("@nestjs/common").HttpStatus;
        data: import("./models/news.model").News[];
    } | {
        status: import("@nestjs/common").HttpStatus;
        error: any;
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
