import { ReytingService } from './reyting.service';
import { ReytingDto } from './dto/reyting.dto';
import { JwtService } from '@nestjs/jwt';
export declare class ReytingController {
    private readonly reytingService;
    private readonly jwtService;
    constructor(reytingService: ReytingService, jwtService: JwtService);
    create(reytingDto: ReytingDto, headers: Record<string, string>): Promise<object>;
    getAll(subject_id: number, group_id: number, headers: Record<string, string>): Promise<object>;
    pagination(page: number, limit: number): Promise<object>;
    delete(id: number): Promise<object>;
}
