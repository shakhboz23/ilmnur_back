import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { VideoChatDto } from './dto/video_chat.dto';
import { VideoChatService } from './video_chat.service';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
export declare class VideoChatController implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly videoChatService;
    private readonly roleService;
    private readonly userService;
    server: Server;
    constructor(videoChatService: VideoChatService, roleService: RoleService, userService: UserService);
    private users;
    afterInit(server: Server): void;
    handleConnection(socket: Socket): void;
    handleDisconnect(socket: Socket): void;
    handleJoinRoom(roomId: string, client: Socket): void;
    handleJoinPeer(data: {
        peerId: string;
        roomId: string;
    }, client: Socket): void;
    handleDisconnectPeer(roomId: string, client: Socket): void;
    getById(room: string): Promise<string | {
        status: import("@nestjs/common").HttpStatus;
        error: any;
    }>;
    create(VideoChatDto: VideoChatDto, client: Socket, req: any): Promise<{
        status: import("@nestjs/common").HttpStatus;
        data: import("./models/video_chat.model").VideoChat;
        error?: undefined;
    } | {
        status: import("@nestjs/common").HttpStatus;
        error: any;
        data?: undefined;
    }>;
    handleMessage({ roomId, userId }: {
        roomId: string;
        userId: string;
    }, client: Socket): Promise<void>;
    sendMessage({ message }: {
        message: string;
    }, client: Socket): Promise<void>;
    getGroupChats({ chatgroup_id, page }: {
        chatgroup_id: number;
        page: number;
    }, client: Socket): Promise<void>;
    update(id: string, VideoChatDto: VideoChatDto, client: Socket): Promise<{
        status: import("@nestjs/common").HttpStatus;
        data: import("./models/video_chat.model").VideoChat;
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
