import { OnModuleInit } from '@nestjs/common';
import { Bot } from './models/bot.model';
import { Context, Telegraf } from 'telegraf';
import { UserService } from 'src/user/user.service';
export declare class BotService implements OnModuleInit {
    private botRepo;
    private readonly bot;
    private readonly userService;
    constructor(botRepo: typeof Bot, bot: Telegraf<Context>, userService: UserService);
    onModuleInit(): Promise<void>;
    commands(): {
        reply_markup: import("@telegraf/types/markup").ReplyKeyboardMarkup;
        parse_mode: string;
    };
    start(ctx: Context): Promise<void>;
    handlePhone(ctx: Context): Promise<void>;
    handlePassword(ctx: Context): Promise<void>;
    onContact(ctx: Context): Promise<void>;
    setPassword(ctx: Context): Promise<void>;
    onStop(ctx: Context): Promise<void>;
    sendOTP(phone: string, OTP: string): Promise<boolean>;
}
