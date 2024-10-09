import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from './models/course.models';
import { UserModule } from 'src/user/user.module';
import { UploadedModule } from 'src/uploaded/uploaded.module';

@Module({
  imports: [SequelizeModule.forFeature([Course]), UserModule, UploadedModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
