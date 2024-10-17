import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Lesson, lessonType } from './models/lesson.models';
import { InjectModel } from '@nestjs/sequelize';
import { LessonDto } from './dto/lesson.dto';
import { Tests } from '../test/models/test.models';
import { Uploaded } from '../uploaded/models/uploaded.models';
import { UserService } from '../user/user.service';
import { Course } from '../course/models/course.models';
import { UploadedService } from '../uploaded/uploaded.service';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson) private lessonRepository: typeof Lesson,
    private readonly userService: UserService,
    private uploadedService: UploadedService,
  ) {}

  async create(lessonDto: LessonDto, video: any): Promise<object> {
    try {
      const { title, content } = lessonDto;
      if (lessonDto.type == 'lesson') {
        let file_type: string;
        let file_data: any;
        if (!content || !video) {
          throw new BadRequestException(
            'Please enter a video, content and lesson_id',
          );
        }
        if (video) {
          file_type = 'video';
          file_data = await this.uploadedService.create({ file_type }, video);
          console.log(file_data);
          video = file_data.data.url;
        }
        lessonDto.lesson_id = +lessonDto.lesson_id || null;
        const video_lesson = await this.lessonRepository.create({
          ...lessonDto,
          video,
        });
        return video_lesson;
      } else {
        const exist = await this.lessonRepository.findOne({
          where: { title },
        });
        if (exist) {
          throw new BadRequestException('Already created');
        }
        const lesson: any = await this.lessonRepository.create({
          title: lessonDto.title,
          published: lessonDto.published,
          course_id: lessonDto.course_id,
          type: lessonDto.type,
        });
        return lesson;
      }
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async getAll(): Promise<object> {
    try {
      // const user_data: any = await this.userService.getById(user_id);
      // if (!user_data) {
      //   new BadRequestException('User not found!');
      // }

      const lessons: any = await this.lessonRepository.findAll({
        where: { lesson_id: null, },
        include: [{ model: Lesson }],
        order: [['id', 'ASC']],
      });
      if (!lessons.length) {
        throw new NotFoundException('Lessons not found');
      }
      return lessons;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getByCourse(course_id: number): Promise<Object> {
    try {
      const lessons: any = await this.lessonRepository.findAll({
        where: {
          course_id,
          lesson_id: null,
        },
        include: [{ model: Lesson }],
        order: [['id', 'ASC']],
      });
      if (!lessons.length) {
        throw new NotFoundException('Lessons not found');
      }
      const course: any = await this.lessonRepository.findOne({
        where: {
          course_id,
        },
        include: [{ model: Course }],
        order: [['id', 'ASC']],
      });
      return { lessons, course: course.course };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getById(id: number): Promise<object> {
    try {
      const lesson = await this.lessonRepository.findOne({
        where: { id },
      });
      if (!lesson) {
        throw new NotFoundException('Lesson not found');
      }
      return lesson;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async pagination(page: number): Promise<object> {
    try {
      const offset = (page - 1) * 10;
      const limit = 10;
      const lessons = await this.lessonRepository.findAll({ offset, limit });
      const total_count = await this.lessonRepository.count();
      const total_pages = Math.ceil(total_count / 10);
      const response = {
        statusCode: HttpStatus.OK,
        data: {
          records: lessons,
          pagination: {
            currentPage: page,
            total_pages,
            total_count,
          },
        },
      };
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, lessonDto: LessonDto): Promise<object> {
    try {
      const lesson = await this.lessonRepository.findByPk(id);
      if (!lesson) {
        throw new NotFoundException('Lesson not found');
      }
      const update = await this.lessonRepository.update(lessonDto, {
        where: { id },
        returning: true,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Updated successfully',
        data: {
          lesson: update[1][0],
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: number): Promise<object> {
    try {
      const lesson = await this.lessonRepository.findByPk(id);
      if (!lesson) {
        throw new NotFoundException('Lesson not found');
      }
      lesson.destroy();
      return {
        statusCode: HttpStatus.OK,
        message: 'Deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
