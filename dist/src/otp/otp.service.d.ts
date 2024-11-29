import { Otp } from './models/otp.model';
import { PhoneDto } from './dto/phone.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
export declare class OtpService {
    private otpRepository;
    constructor(otpRepository: typeof Otp);
    sendOTP(phoneDto: PhoneDto): Promise<object>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<object>;
    newToken(): Promise<string>;
}
