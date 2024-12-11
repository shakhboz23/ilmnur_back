import { Ctx, Start, Update, On, Help, Hears } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { Context } from 'telegraf';

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) { }

  @Start()
  async onStart(@Ctx() ctx: Context) {
    return this.botService.start(ctx);
  }

  @Help()
  async help(@Ctx() ctx: Context) {
    console.log(ctx);
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async on(@Ctx() ctx: Context) {
    await ctx.reply('👍');
  }

  @Hears('hi')
  async hears(@Ctx() ctx: Context) {
    await ctx.reply('Hi');
  }

  @Hears("Telefon raqamni o'zgartirish")
  async handlePhone(@Ctx() ctx: Context) {
    // await ctx.reply('Hi');
    return this.botService.handlePhone(ctx);
  }

  @Hears("Parolni o'zgaritish")
  async handlePassword(@Ctx() ctx: Context) {
    // await ctx.reply('Hi');
    return this.botService.handlePassword(ctx);
  }

  @Hears(/pass:\w+/)
  async handlePasswordRegex(@Ctx() ctx: Context) {
    return this.botService.setPassword(ctx);
    // const password = ctx.message.text.split(':')[1];
    // console.log('Extracted password:', password);

    // await ctx.reply(`Password "${password}" received.`);
  }

  @On('contact')
  async onContact(@Ctx() ctx: Context) {
    return this.botService.onContact(ctx);
  }

  @On('message')
  async handleMessages(@Ctx() ctx: Context) {
    await ctx.reply(`Noto'g'ri ma'lumot!`);
  }
}
