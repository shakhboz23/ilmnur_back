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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const bot_model_1 = require("./models/bot.model");
const app_constants_1 = require("../app.constants");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const telegraf_1 = require("telegraf");
const files_service_1 = require("../files/files.service");
let BotService = class BotService {
    constructor(botRepo, bot, fileService) {
        this.botRepo = botRepo;
        this.bot = bot;
        this.fileService = fileService;
        this.bot_id = process.env.BOT_ID;
    }
    initialize() {
        this.bot.start((ctx) => this.handleStart(ctx));
        this.bot.launch().then(() => {
            console.log('Telegram Bot has been started.');
        });
    }
    async handleStart(ctx) {
        const welcomeMessage = `Welcome!`;
        await ctx.reply(welcomeMessage);
    }
    async start(ctx) {
        await ctx.reply(`Welcome to our bot!`);
    }
    async onStop(ctx) {
        process.exit();
    }
    async sendAudio(file_name, full_name, part1, part2) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'Asia/Tashkent',
        };
        const currentDate = new Date().toLocaleString('uz-UZ', options);
        console.log((_c = (_b = (_a = part2.data) === null || _a === void 0 ? void 0 : _a.part2) === null || _b === void 0 ? void 0 : _b.part3[0]) === null || _c === void 0 ? void 0 : _c.part3);
        const caption = `
finished time: ${currentDate}
full name: ${full_name}\n 
part1: ${'\n' + ((_f = (_e = (_d = part1.data) === null || _d === void 0 ? void 0 : _d.part1) === null || _e === void 0 ? void 0 : _e.part1) === null || _f === void 0 ? void 0 : _f.join('\n'))}
part2: ${'\n' + ((_j = (_h = (_g = part2.data) === null || _g === void 0 ? void 0 : _g.part2) === null || _h === void 0 ? void 0 : _h.part2) === null || _j === void 0 ? void 0 : _j.join('\n'))}
part3: ${'\n' + ((_o = (_m = (_l = (_k = part2.data) === null || _k === void 0 ? void 0 : _k.part2) === null || _l === void 0 ? void 0 : _l.part3[0]) === null || _m === void 0 ? void 0 : _m.part3) === null || _o === void 0 ? void 0 : _o.join('\n'))}
`;
        try {
            await this.bot.telegram.sendAudio(this.bot_id, { source: file_name.buffer }, { caption });
            console.log('Audio sent successfully');
        }
        catch (error) {
            console.error('Error sending audio:', error);
        }
    }
};
exports.BotService = BotService;
exports.BotService = BotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(bot_model_1.Bot)),
    __param(1, (0, nestjs_telegraf_1.InjectBot)(app_constants_1.BOT_NAME)),
    __metadata("design:paramtypes", [Object, telegraf_1.Telegraf,
        files_service_1.FilesService])
], BotService);
//# sourceMappingURL=bot.service.js.map