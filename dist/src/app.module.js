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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const files_module_1 = require("./files/files.module");
const chat_module_1 = require("./chat/chat.module");
const lesson_module_1 = require("./lesson/lesson.module");
const user_module_1 = require("./user/user.module");
const group_module_1 = require("./group/group.module");
const chat_group_module_1 = require("./chat_group/chat_group.module");
const test_module_1 = require("./test/test.module");
const uploaded_module_1 = require("./uploaded/uploaded.module");
const notification_module_1 = require("./notification/notification.module");
const messages_module_1 = require("./messages/messages.module");
const role_module_1 = require("./role/role.module");
const activity_module_1 = require("./activity/activity.module");
const reyting_module_1 = require("./reyting/reyting.module");
const news_module_1 = require("./news/news.module");
const otp_module_1 = require("./otp/otp.module");
const class_module_1 = require("./user_step/class.module");
const mail_module_1 = require("./mail/mail.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const resetpassword_module_1 = require("./resetpassword/resetpassword.module");
const category_module_1 = require("./category/category.module");
const course_module_1 = require("./course/course.module");
const like_module_1 = require("./likes/like.module");
const subscriptions_module_1 = require("./subscriptions/subscriptions.module");
const user_service_1 = require("./user/user.service");
const subscription_activity_module_1 = require("./subscription_activity/subscription_activity.module");
const video_chat_module_1 = require("./video_chat/video_chat.module");
const bot_module_1 = require("./bot/bot.module");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const app_constants_1 = require("./app.constants");
const bot_model_1 = require("./bot/models/bot.model");
const user_models_1 = require("./user/models/user.models");
const chat_model_1 = require("./chat/models/chat.model");
const category_models_1 = require("./category/models/category.models");
const group_models_1 = require("./group/models/group.models");
const course_models_1 = require("./course/models/course.models");
const lesson_models_1 = require("./lesson/models/lesson.models");
const like_models_1 = require("./likes/models/like.models");
const test_models_1 = require("./test/models/test.models");
const chat_group_models_1 = require("./chat_group/models/chat_group.models");
const uploaded_models_1 = require("./uploaded/models/uploaded.models");
const notification_model_1 = require("./notification/models/notification.model");
const role_models_1 = require("./role/models/role.models");
const activity_models_1 = require("./activity/models/activity.models");
const reyting_models_1 = require("./reyting/models/reyting.models");
const news_model_1 = require("./news/models/news.model");
const otp_model_1 = require("./otp/models/otp.model");
const class_models_1 = require("./user_step/models/class.models");
const subscriptions_models_1 = require("./subscriptions/models/subscriptions.models");
const subscription_activity_models_1 = require("./subscription_activity/models/subscription_activity.models");
const video_chat_model_1 = require("./video_chat/models/video_chat.model");
let AppModule = class AppModule {
    constructor(userService) {
        this.userService = userService;
    }
    async onApplicationBootstrap() {
        await this.userService.createDefaultUser();
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_telegraf_1.TelegrafModule.forRootAsync({
                botName: app_constants_1.BOT_NAME,
                useFactory: () => ({
                    token: process.env.BOT_TOKEN,
                    middlewares: [],
                    includes: [bot_module_1.BotModule],
                }),
            }),
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.PG_HOST,
                port: Number(process.env.PG_PORT),
                username: process.env.PG_USER,
                password: String(process.env.PG_PASS),
                database: process.env.PG_DB,
                models: [
                    category_models_1.Category,
                    group_models_1.Group,
                    course_models_1.Course,
                    lesson_models_1.Lesson,
                    like_models_1.Like,
                    chat_model_1.Chat,
                    test_models_1.Tests,
                    user_models_1.User,
                    chat_group_models_1.ChatGroup,
                    uploaded_models_1.Uploaded,
                    notification_model_1.Notification,
                    role_models_1.Role,
                    activity_models_1.Activity,
                    reyting_models_1.Reyting,
                    news_model_1.News,
                    otp_model_1.Otp,
                    class_models_1.UserStep,
                    subscriptions_models_1.Subscriptions,
                    subscription_activity_models_1.SubscriptionActivity,
                    video_chat_model_1.VideoChat,
                    bot_model_1.Bot,
                ],
                autoLoadModels: true,
                logging: true,
                dialectOptions: process.env.NODE_ENV === 'production'
                    ? {
                        ssl: {
                            require: true,
                            rejectUnauthorized: false,
                        },
                    }
                    : {},
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.resolve)(__dirname, '..', 'static'),
            }),
            jwt_1.JwtModule.register({ global: true }),
            mail_module_1.MailModule,
            files_module_1.FilesModule,
            category_module_1.CategoryModule,
            group_module_1.GroupModule,
            course_module_1.CourseModule,
            lesson_module_1.LessonModule,
            like_module_1.LikeModule,
            chat_module_1.ChatModule,
            test_module_1.TestsModule,
            user_module_1.UserModule,
            chat_group_module_1.ChatGroupModule,
            uploaded_module_1.UploadedModule,
            notification_module_1.NotificationModule,
            messages_module_1.MessagesModule,
            role_module_1.RoleModule,
            activity_module_1.ActivityModule,
            reyting_module_1.ReytingModule,
            news_module_1.NewsModule,
            otp_module_1.OtpModule,
            class_module_1.UserStepModule,
            cloudinary_module_1.CloudinaryModule,
            resetpassword_module_1.ResetpasswordModule,
            subscriptions_module_1.SubscriptionsModule,
            subscription_activity_module_1.Subscription_activityModule,
            video_chat_module_1.VideoChatModule,
            bot_module_1.BotModule,
        ],
        controllers: [],
        providers: [],
        exports: []
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AppModule);
//# sourceMappingURL=app.module.js.map