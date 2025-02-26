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
const user_service_1 = require("../user/user.service");
let BotService = class BotService {
    constructor(botRepo, bot, userService) {
        this.botRepo = botRepo;
        this.bot = bot;
        this.userService = userService;
    }
    commands() {
        return {
            parse_mode: 'HTML',
            ...telegraf_1.Markup.keyboard([
                ["Parolni o'zgaritish", "Telefon raqamni o'zgartirish"],
            ])
                .oneTime()
                .resize()
        };
    }
    ;
    async start(ctx) {
        try {
            const bot_id = ctx.from.id;
            const user = await this.botRepo.findOne({ where: { bot_id } });
            if (!user) {
                await this.botRepo.create({
                    bot_id: bot_id,
                    name: ctx.from.first_name,
                    surname: ctx.from.last_name,
                    username: ctx.from.username,
                });
                await ctx.reply(`Iltimos, <b> "Telefon raqamni yuborish"</b> tugmasini bosing!`, {
                    parse_mode: 'HTML',
                    ...telegraf_1.Markup.keyboard([
                        [telegraf_1.Markup.button.contactRequest('Telefon raqamni yuborish')],
                    ])
                        .oneTime()
                        .resize(),
                });
            }
            else if (!user.dataValues.status) {
                await ctx.reply(`Iltimos, <b> "Telefon raqamni yuborish"</b> tugmasini bosing!`, {
                    parse_mode: 'HTML',
                    ...telegraf_1.Markup.keyboard([
                        [telegraf_1.Markup.button.contactRequest('Telefon raqamni yuborish')],
                    ])
                        .oneTime()
                        .resize(),
                });
            }
            else {
                await this.bot.telegram.sendChatAction(bot_id, 'typing');
                await ctx.reply("Bu bot orqali IlmNur dasturi orqali ro'yhatga o'tilgan", {
                    parse_mode: 'HTML',
                    ...telegraf_1.Markup.keyboard([
                        ["Parolni o'zgaritish", "Telefon raqamni o'zgartirish"],
                    ])
                        .oneTime()
                        .resize()
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async handlePhone(ctx) {
        const bot_id = ctx.from.id;
        const user = await this.botRepo.findOne({ where: { bot_id } });
        await ctx.reply(`Iltimos, <b> "Telefon raqamni yuborish"</b> tugmasini bosing!`, {
            parse_mode: 'HTML',
            ...telegraf_1.Markup.keyboard([
                [telegraf_1.Markup.button.contactRequest('Telefon raqamni yuborish')],
            ])
                .oneTime()
                .resize(),
        });
    }
    async handlePassword(ctx) {
        const bot_id = ctx.from.id;
        const user = await this.botRepo.findOne({ where: { bot_id } });
        await ctx.reply("Parolingizni quyidagicha kiriting: 👇👇👇 \n\npass:user123", {
            parse_mode: 'HTML',
            ...telegraf_1.Markup.removeKeyboard(),
        });
    }
    async onContact(ctx) {
        if ('contact' in ctx.message) {
            const bot_id = ctx.from.id;
            let is_phone = false;
            const user = await this.botRepo.findOne({ where: { bot_id } });
            if (!user) {
                await ctx.reply(`Iltimos, <b>Start</b> tugmasini bosing!`, {
                    parse_mode: 'HTML',
                    ...telegraf_1.Markup.keyboard([['/start']])
                        .oneTime()
                        .resize(),
                });
            }
            else if (ctx.message.contact.user_id != bot_id) {
                await ctx.reply("Iltimos, o'zingizni telefon raqamingizni kiriting!", {
                    parse_mode: 'HTML',
                    ...telegraf_1.Markup.keyboard([
                        [telegraf_1.Markup.button.contactRequest('Telefon raqamni yuborish')],
                    ])
                        .oneTime()
                        .resize(),
                });
            }
            else {
                if (user.phone) {
                    is_phone = true;
                }
                let phone;
                ctx.message.contact.phone_number[0] == '+'
                    ? (phone = ctx.message.contact.phone_number)
                    : (phone = '+' + ctx.message.contact.phone_number);
                if (user.phone) {
                }
                const bot_user = await this.botRepo.update({ phone, status: true }, {
                    where: { bot_id },
                    returning: true
                });
                if (is_phone) {
                    await ctx.reply("Telefon raqamingiz muvaffaqiyatli o'zgartirildi", {
                        parse_mode: 'HTML',
                        ...telegraf_1.Markup.removeKeyboard(),
                    });
                }
                else {
                    await ctx.reply("Parolingizni quyidagicha kiriting: 👇👇👇 \n\npass:user123", {
                        parse_mode: 'HTML',
                        ...telegraf_1.Markup.removeKeyboard(),
                    });
                }
            }
        }
    }
    async setPassword(ctx) {
        const bot_id = ctx.from.id;
        console.log(ctx);
        const message = ctx.message;
        const password = message.text.split(':')[1];
        const user = await this.botRepo.findOne({ where: { bot_id } });
        let bot_user;
        if (!user?.user_id) {
            console.log(bot_user);
            console.log(bot_user.data.user.get('id'));
            await this.botRepo.update({ user_id: bot_user.data.user.get('id') }, {
                where: { bot_id: user.bot_id },
                returning: true
            });
            const url = `https://www.ilmnur.online/login?token=${bot_user.token}`;
            await ctx.reply(`[IlmNur online saytiga kirish uchun shu yerga bosing](${url})`, { parse_mode: 'MarkdownV2' });
        }
        else {
            bot_user = await this.userService.updatePassword(password, user.phone);
            await ctx.reply(`Parolingiz muvaffaqiyatli o'zgartirildi`);
        }
        console.log(bot_user);
    }
    async onStop(ctx) { }
    async sendOTP(phone, OTP) {
        const user = await this.botRepo.findOne({ where: { phone } });
        if (!user)
            return false;
        await this.bot.telegram.sendChatAction(user.bot_id, 'typing');
        await this.bot.telegram.sendMessage(user.bot_id, 'Verify code:' + OTP);
        return true;
    }
};
exports.BotService = BotService;
__decorate([
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], BotService.prototype, "setPassword", null);
exports.BotService = BotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(bot_model_1.Bot)),
    __param(1, (0, nestjs_telegraf_1.InjectBot)(app_constants_1.BOT_NAME)),
    __metadata("design:paramtypes", [Object, telegraf_1.Telegraf,
        user_service_1.UserService])
], BotService);
//# sourceMappingURL=bot.service.js.map