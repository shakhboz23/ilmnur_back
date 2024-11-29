/// <reference types="multer" />
import { LikeService } from './like.service';
import { LikeDto } from './dto/like.dto';
import { JwtService } from '@nestjs/jwt';
export declare class LikeController {
    private readonly likeService;
    private readonly jwtService;
    constructor(likeService: LikeService, jwtService: JwtService);
    create(likeDto: LikeDto, file: Express.Multer.File): Promise<object>;
    getById(id: number): Promise<object>;
    getAll(headers?: string): Promise<object>;
    pagination(page: number): Promise<object>;
    update(id: number, likeDto: LikeDto): Promise<object>;
    deleteLike(id: number): Promise<object>;
}
