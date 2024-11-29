import { JwtService } from '@nestjs/jwt';
import { ResetpasswordService } from './resetpassword.service';
import { ResetpasswordDto } from './dto/resetpassword.dto';
export declare class ResetpasswordController {
    private readonly resetpasswordService;
    private readonly jwtService;
    constructor(resetpasswordService: ResetpasswordService, jwtService: JwtService);
    create(resetpasswordDto: ResetpasswordDto): Promise<object>;
    getById(id: number): Promise<object>;
    getAll(): Promise<object>;
    deleteResetpassword(id: number): Promise<object>;
}
