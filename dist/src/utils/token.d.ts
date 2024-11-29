import { Response } from 'express';
export declare function generateToken(jwt_payload: object, jwtService: any): Promise<{
    access_token: any;
    refresh_token: any;
}>;
export declare function writeToCookie(refresh_token: string, res: Response): Promise<void>;
export declare function extractUserIdFromToken(headers: any, jwtService: any, is_optional?: boolean): number | null;
