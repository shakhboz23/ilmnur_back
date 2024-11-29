"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let AuthGuard = class AuthGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const auth_header = req.headers.authorization;
        if (!auth_header) {
            throw new common_1.UnauthorizedException({
                message: 'Token topilmadi!',
            });
        }
        const bearer = auth_header.split(' ')[0];
        const token = auth_header.split(' ')[1];
        if (bearer !== 'Bearer' || !token) {
            throw new common_1.UnauthorizedException({
                message: 'Token topilmadi!',
            });
        }
        let user;
        try {
            user = this.jwtService.verify(token, {
                secret: process.env.ACCESS_TOKEN_KEY,
            });
            req.user = user;
            const date_now = +Date.now().toString().slice(0, 10);
            if (date_now >= req.user.exp) {
                const refresh_token = req.cookies.refresh_token;
                user = this.jwtService.verify(refresh_token, {
                    secret: process.env.REFRESH_TOKEN_KEY,
                });
                if (date_now >= user.exp) {
                    throw new common_1.UnauthorizedException({
                        message: 'Token vaqti tugagan!',
                    });
                }
                else {
                    const jwt_payload = { id: req.user.id };
                    const access_token = await this.jwtService.signAsync(jwt_payload, {
                        secret: process.env.ACCESS_TOKEN_KEY,
                        expiresIn: process.env.ACCESS_TOKEN_TIME,
                    });
                }
            }
        }
        catch (error) {
            throw new common_1.UnauthorizedException({
                message: 'Token vaqti tugagan!',
            });
        }
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthGuard);
async function generateAccessToken(id, jwtService) {
    const access_token = await jwtService.signAsync(id, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
    });
    return access_token;
}
exports.generateAccessToken = generateAccessToken;
//# sourceMappingURL=auth.guard.js.map