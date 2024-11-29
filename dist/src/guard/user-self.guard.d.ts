import { JwtService } from '@nestjs/jwt/dist';
import { ExecutionContext, CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class UserSelfGuard implements CanActivate {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
