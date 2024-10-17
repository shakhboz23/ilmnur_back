import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { FilesModule } from './files/files.module';
import { TeacherModule } from './teachers/teacher.module';
import { ChatModule } from './chat/chat.module';
import { LessonModule } from './lesson/lesson.module';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { ChatGroupModule } from './chat_group/chat_group.module';
import { TestsModule } from './test/test.module';
import { UploadedModule } from './uploaded/uploaded.module';
import { NotificationModule } from './notification/notification.module';
import { MessagesModule } from './messages/messages.module';
import { RoleModule } from './role/role.module';
import { ActivityModule } from './activity/activity.module';
import { ReytingModule } from './reyting/reyting.module';
import { NewsModule } from './news/news.module';
import { OtpModule } from './otp/otp.module';
import { UserStepModule } from './user_step/class.module';
import { MailModule } from './mail/mail.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ResetpasswordModule } from './resetpassword/resetpassword.module';
import { CategoryModule } from './category/category.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: String(process.env.PG_PASS),
      database: process.env.PG_DB,
      autoLoadModels: true,
      logging: true,
      dialectOptions:
        process.env.NODE_ENV === 'production'
          ? {
              ssl: {
                require: true,
                rejectUnauthorized: false,
              },
            }
          : {},
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', 'static'),
    }),
    JwtModule.register({ global: true }),
    MailModule,
    FilesModule,
    CategoryModule,
    GroupModule,
    CourseModule,
    LessonModule,
    // ChatGateway,
    TeacherModule,
    ChatModule,
    StudentModule,
    TestsModule,
    UserModule,
    ChatGroupModule,
    UploadedModule,
    NotificationModule,
    MessagesModule,
    RoleModule,
    ActivityModule,
    ReytingModule,
    NewsModule,
    OtpModule,
    UserStepModule,
    CloudinaryModule,
    ResetpasswordModule,
  ],
})
export class AppModule {}
