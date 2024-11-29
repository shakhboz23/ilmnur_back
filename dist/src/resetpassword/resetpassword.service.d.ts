import { Resetpassword } from './models/resetpassword.models';
import { JwtService } from '@nestjs/jwt';
import { ResetpasswordDto } from './dto/resetpassword.dto';
import { MailService } from '../mail/mail.service';
export declare class ResetpasswordService {
    private resetpasswordRepository;
    private readonly mailService;
    private readonly jwtService;
    constructor(resetpasswordRepository: typeof Resetpassword, mailService: MailService, jwtService: JwtService);
    create(resetpasswordDto: ResetpasswordDto): Promise<object>;
    getAll(): Promise<object>;
    getById(id: number): Promise<object>;
    checkActivationLink(activate_link: any): Promise<string>;
    delete(id: number): Promise<object>;
}
