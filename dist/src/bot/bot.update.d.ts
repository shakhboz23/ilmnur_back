import { BotService } from './bot.service';
import { Context } from 'telegraf';
export declare class BotUpdate {
    private readonly botService;
    constructor(botService: BotService);
    onStart(ctx: Context): Promise<void>;
    botLaunch(): Promise<void>;
    help(ctx: Context): Promise<void>;
    on(ctx: Context): Promise<void>;
    hears(ctx: Context): Promise<void>;
    handlePhone(ctx: Context): Promise<void>;
    handlePassword(ctx: Context): Promise<void>;
    handlePasswordRegex(ctx: Context): Promise<void>;
    onContact(ctx: Context): Promise<void>;
    handleMessages(ctx: Context): Promise<void>;
}
