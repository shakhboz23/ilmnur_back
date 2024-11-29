import { HttpStatus } from '@nestjs/common';
import { Uploaded } from './models/uploaded.models';
import { JwtService } from '@nestjs/jwt';
import { UploadedDto } from './dto/uploaded.dto';
import { FilesService } from '../files/files.service';
import { UpdateDto } from './dto/update';
export declare class UploadedService {
    private uploadedRepository;
    private readonly jwtService;
    private readonly fileService;
    constructor(uploadedRepository: typeof Uploaded, jwtService: JwtService, fileService: FilesService);
    getVideoDuration(): Promise<void>;
    parseDuration(duration: any): number;
    create(uploadedDto: UploadedDto, file: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
        error?: undefined;
    } | {
        statusCode: HttpStatus;
        error: any;
        message?: undefined;
        data?: undefined;
    }>;
    upload(uploadedDto: UploadedDto, file: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: Uploaded;
        error?: undefined;
    } | {
        statusCode: HttpStatus;
        error: any;
        message?: undefined;
        data?: undefined;
    }>;
    getAll(): Promise<object>;
    getById(public_id: number): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, updateDto: UpdateDto): Promise<object>;
    delete(id: number): Promise<object>;
}
