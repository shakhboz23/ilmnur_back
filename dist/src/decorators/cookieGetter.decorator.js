"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieGetter = void 0;
const common_1 = require("@nestjs/common");
exports.CookieGetter = (0, common_1.createParamDecorator)(async (data, context) => {
    const request = context.switchToHttp().getRequest();
    const refresh_token = request.cookies[data];
    if (!refresh_token) {
        throw new common_1.UnauthorizedException(common_1.HttpStatus.UNAUTHORIZED, "Ruxsat yo'q!");
    }
    return refresh_token;
});
//# sourceMappingURL=cookieGetter.decorator.js.map