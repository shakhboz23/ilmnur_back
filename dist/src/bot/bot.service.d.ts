import { Bot } from './models/bot.model';
import { Context, Telegraf } from 'telegraf';
import { FilesService } from '../files/files.service';
export declare class BotService {
    private botRepo;
    private readonly bot;
    private readonly fileService;
    constructor(botRepo: typeof Bot, bot: Telegraf<Context>, fileService: FilesService);
    private bot_id;
    private initialize;
    private handleStart;
    start(ctx: Context): Promise<void>;
    onStop(ctx: Context): Promise<void>;
    sendAudio(file_name: any, full_name: string, part1: any, part2: any): Promise<void>;
}
