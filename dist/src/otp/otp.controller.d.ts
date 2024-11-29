import { OtpService } from './otp.service';
import { PhoneDto } from './dto/phone.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    sendOtp(phoneDto: PhoneDto): Promise<object>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<object>;
    newToken(): Promise<string>;
}
