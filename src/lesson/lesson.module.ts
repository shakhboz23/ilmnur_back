import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lesson } from './models/lesson.models';
import { UserModule } from '../user/user.module';
import { UploadedModule } from '../uploaded/uploaded.module';

@Module({
  imports: [SequelizeModule.forFeature([Lesson]), UserModule, UploadedModule],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
