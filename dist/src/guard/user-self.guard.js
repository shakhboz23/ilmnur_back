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
exports.UserSelfGuard = void 0;
const dist_1 = require("@nestjs/jwt/dist");
const common_1 = require("@nestjs/common");
let UserSelfGuard = class UserSelfGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        if (String(req.user.id) !== req.params.id) {
            throw new common_1.UnauthorizedException({
                message: 'Ruxsat etilmagan foydalanuvchi',
            });
        }
        return true;
    }
};
exports.UserSelfGuard = UserSelfGuard;
exports.UserSelfGuard = UserSelfGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dist_1.JwtService])
], UserSelfGuard);
//# sourceMappingURL=user-self.guard.js.map