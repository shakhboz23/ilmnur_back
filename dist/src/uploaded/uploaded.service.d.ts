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
    getVideoDuration(youtube: string): Promise<number>;
    extractYoutubeId(url: string): string | null;
    parseDuration(duration: any): number;
    create(file: any, file_type: string): Promise<any>;
    upload(uploadedDto: UploadedDto, file: any): Promise<void>;
    getAll(): Promise<object>;
    getById(public_id: number): Promise<void>;
    pagination(page: number): Promise<object>;
    update(id: number, updateDto: UpdateDto): Promise<object>;
    delete(id: number): Promise<object>;
}
