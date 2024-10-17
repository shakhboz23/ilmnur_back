import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Course } from './models/course.models';
import { InjectModel } from '@nestjs/sequelize';
import { CourseDto } from './dto/course.dto';
import { Tests } from '../test/models/test.models';
import { UserService } from '../user/user.service';
import { UploadedService } from '../uploaded/uploaded.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course) private courseRepository: typeof Course,
    private readonly userService: UserService,
    private readonly uploadedService: UploadedService,
  ) {}

  async create(courseDto: CourseDto, cover: any): Promise<object> {
    try {
      const { title } = courseDto;
      const exist = await this.courseRepository.findOne({
        where: { title },
      });
      if (exist) {
        throw new BadRequestException('Already created');
      }
      const file_type: string = 'image';
      let file_data: any;
      let image_url: string;
      if (cover) {
        file_data = await this.uploadedService.create({ file_type }, cover);
        cover = file_data.data.url;
      }
      const course: any = await this.courseRepository.create({...courseDto, cover});
      return {
        statusCode: HttpStatus.OK,
        message: 'Created successfully',
        data: course,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAll(): Promise<object> {
    try {
      // const user_data: any = await this.userService.getById(user_id);
      // if (!user_data) {
      //   new BadRequestException('User not found!');
      // }

      const courses: any = await this.courseRepository.findAll({     
        order: [['id', 'ASC']],
      });
      if (!courses.length) {
        throw new NotFoundException('Courses not found');
      }
      return courses;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getByCourse(group_id: number): Promise<Object> {
    try {
      const courses: any = await this.courseRepository.findAll({     
        where: {
          group_id,
        },
        order: [['id', 'ASC']],
      });
      if (!courses.length) {
        throw new NotFoundException('Courses not found');
      }
      return courses;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getById(id: number): Promise<object> {
    try {
      const course = await this.courseRepository.findOne({
        where: { id },
        include: [
          { model: Tests, attributes: ['id'] },
        ],
      });
      if (!course) {
        throw new NotFoundException('Course not found');
      }
      return {
        statusCode: HttpStatus.OK,
        data: course,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async pagination(page: number): Promise<object> {
    try {
      const offset = (page - 1) * 10;
      const limit = 10;
      const courses = await this.courseRepository.findAll({ offset, limit });
      const total_count = await this.courseRepository.count();
      const total_pages = Math.ceil(total_count / 10);
      const response = {
        statusCode: HttpStatus.OK,
        data: {
          records: courses,
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

  async update(id: number, courseDto: CourseDto): Promise<object> {
    try {
      const course = await this.courseRepository.findByPk(id);
      if (!course) {
        throw new NotFoundException('Course not found');
      }
      const update = await this.courseRepository.update(courseDto, {
        where: { id },
        returning: true,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Updated successfully',
        data: {
          course: update[1][0],
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: number): Promise<object> {
    try {
      const course = await this.courseRepository.findByPk(id);
      if (!course) {
        throw new NotFoundException('Course not found');
      }
      course.destroy();
      return {
        statusCode: HttpStatus.OK,
        message: 'Deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
