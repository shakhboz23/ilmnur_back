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
import { Subscriptions } from 'src/subscriptions/models/subscriptions.models';
import { User } from 'src/user/models/user.models';
import { Role } from 'src/role/models/role.models';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { SubscriptionActivity } from 'src/subscription_activity/models/subscription_activity.models';
import { Group } from 'src/group/models/group.models';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course) private courseRepository: typeof Course,
    private readonly userService: UserService,
    private readonly uploadedService: UploadedService,
  ) { }

  async create(courseDto: CourseDto, cover: any, user_id: number): Promise<object> {
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
      const course: any = await this.courseRepository.create({
        ...courseDto,
        user_id,
        cover,
      });
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

  async getByCourse(group_id: number, category_id: number): Promise<Object> {
    try {
      console.log(+category_id);
      console.log(category_id == 0);
      category_id = category_id == 0 ? undefined : +category_id
      let category: any = {}
      if (category_id) {
        category = { category_id }
      }
      const courses: any = await this.courseRepository.findAll({
        where: {
          group_id,
          ...category,
        },
        order: [['id', 'ASC']],
        include: [
          {
            model: Subscriptions,
            attributes: ['user_id'],
            include: [{ model: User, include: [{ model: Role }] }],
          },
        ],
      });
      if (!courses.length) {
        throw new NotFoundException('Courses not found');
      }
      return courses;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUsersByGroupId(group_id: number, date: Date, user_id: number, course_id: number): Promise<object> {
    try {
      course_id = +course_id || null;
      let id: any;
      course_id ? id = { id: course_id } : {};
      // let id = {};
      console.log(id);
      const targetDate = new Date(date);
      const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0)); // Kun boshidan
      const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999)); // Kun oxirigacha
      console.log(startOfDay, endOfDay);
      let users: any = await this.courseRepository.findAll({
        where: { group_id },
        include: [{
          model: Subscriptions, include: [{ model: User }, {
            model: SubscriptionActivity, where: {
              course_id,
              createdAt: {
                [Op.between]: [startOfDay, endOfDay], // Sana oralig'i
              },
            },
            required: false
          }, { model: Course, where: { ...id } }]
        }],
        order: [[{ model: Subscriptions, as: 'subscriptions' }, { model: User, as: 'user' }, 'name', 'ASC']],
      });
      console.log(users, '23033')
      let user: any = await this.courseRepository.findOne({
        where: { group_id },
        include: [{
          model: Subscriptions, where: { user_id }
        }, //{ model: Group, where: { user_id }, required: false }
        ],
      });
      console.log(user, '2222');
      if (!users) {
        throw new NotFoundException('Users not found');
      }
      users = users.reduce((acc, item) => acc.concat(item.subscriptions), []);
      // console.log(users);

      return { users, user: user?.subscriptions[0] };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getById(id: number, user_id: number): Promise<object> {
    try {
      const course = await this.courseRepository.findOne({
        where: { id },
        attributes: {
          include: [
            [
              Sequelize.literal(
                `(SELECT "user"."id" FROM "user" JOIN "group" ON "group"."id" = "Course"."group_id" LIMIT 1)::int`,
              ),
              'user_id',
            ],
            [
              Sequelize.literal(
                `(SELECT COUNT(*) FROM "lesson" WHERE "lesson"."course_id" = :id AND "lesson"."type" = 'lesson')::int`,
              ),
              'lessons_count',
            ],
            [
              Sequelize.literal(
                `(SELECT COUNT(*) FROM "reyting" WHERE "reyting"."lesson_id" IN (SELECT "id" FROM "lesson" WHERE "lesson"."course_id" = :id) AND "reyting"."user_id" = :user_id AND "reyting"."ball" > 70)::int`,
              ),
              'finished_count',
            ],
          ],
        },
        replacements: {
          id,
          user_id,
        },
      });
      if (!course) {
        throw new NotFoundException('Course not found');
      }
      return course;
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
