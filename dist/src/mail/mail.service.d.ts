import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../user/models/user.models';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserConfirmation(user: User, token: string): Promise<void>;
    sendUserActivationLink(activation_link: string, email: string): Promise<void>;
}
