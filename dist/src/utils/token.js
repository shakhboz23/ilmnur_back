"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUserIdFromToken = exports.writeToCookie = exports.generateToken = void 0;
const common_1 = require("@nestjs/common");
async function generateToken(jwt_payload, jwtService) {
    try {
        const [access_token, refresh_token] = await Promise.all([
            jwtService.signAsync(jwt_payload, {
                secret: process.env.ACCESS_TOKEN_KEY,
                expiresIn: process.env.ACCESS_TOKEN_TIME,
            }),
            jwtService.signAsync(jwt_payload, {
                secret: process.env.REFRESH_TOKEN_KEY,
                expiresIn: process.env.REFRESH_TOKEN_TIME,
            }),
        ]);
        return { access_token, refresh_token };
    }
    catch (error) {
        throw new common_1.BadGatewayException(error.message);
    }
}
exports.generateToken = generateToken;
async function writeToCookie(refresh_token, res) {
    try {
        res.cookie('refresh_token', refresh_token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
    }
    catch (error) {
        throw new common_1.BadGatewayException(error.message);
    }
}
exports.writeToCookie = writeToCookie;
function extractUserIdFromToken(headers, jwtService, is_optional) {
    const authHeader = headers['authorization'];
    const token = authHeader?.split(' ')[1];
    console.log(token, !token, 'token');
    if (!token || token == 'null') {
        console.log(is_optional);
        if (is_optional)
            return;
        throw new common_1.UnauthorizedException('Token not found');
    }
    try {
        const user = jwtService.verify(token, {
            secret: process.env.ACCESS_TOKEN_KEY,
        });
        console.log(token);
        console.log(user);
        return user?.id || null;
    }
    catch (error) {
        console.log(error);
        throw new common_1.UnauthorizedException('Invalid or expired token');
    }
}
exports.extractUserIdFromToken = extractUserIdFromToken;
//# sourceMappingURL=token.js.map