import { OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class ChatGateway implements OnGatewayInit, OnGatewayDisconnect {
    server: Server;
    afterInit(): void;
    handleDisconnect(client: Socket): void;
}
