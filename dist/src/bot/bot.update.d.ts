import { BotService } from './bot.service';
import { Context } from 'telegraf';
export declare class BotUpdate {
    private readonly botService;
    constructor(botService: BotService);
    onStart(ctx: Context): Promise<void>;
    help(ctx: Context): Promise<void>;
    on(ctx: Context): Promise<void>;
    hears(ctx: Context): Promise<void>;
}
