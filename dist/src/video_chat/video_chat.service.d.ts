import { HttpStatus } from '@nestjs/common';
import { VideoChat } from './models/video_chat.model';
import { FilesService } from '../files/files.service';
import { VideoChatDto } from './dto/video_chat.dto';
export declare class VideoChatService {
    private readonly VideoChatRepository;
    private readonly fileService;
    constructor(VideoChatRepository: typeof VideoChat, fileService: FilesService);
    create(videoChatDto: VideoChatDto, headers: {
        'user-agent': string;
    }): Promise<{
        status: HttpStatus;
        data: VideoChat;
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        data?: undefined;
    }>;
    joinRoom(room: string): Promise<string | {
        status: HttpStatus;
        error: any;
    }>;
    findAll(page: number): Promise<{
        status: HttpStatus;
        data: {
            records: VideoChat[];
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
    getGroupChats(chatgroup_id: number, page: number): Promise<{
        status: HttpStatus;
        data: {
            records: VideoChat[];
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
    findAllId(): Promise<VideoChat[] | {
        status: HttpStatus;
        error: any;
    }>;
    findById(id: string): Promise<{
        status: HttpStatus;
        data: VideoChat;
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        data?: undefined;
    }>;
    update(id: string, videoChatDto: VideoChatDto): Promise<{
        status: HttpStatus;
        data: VideoChat;
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
