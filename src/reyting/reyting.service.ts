import { FilesService } from '../files/files.service';
import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reyting } from './models/reyting.models';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { User } from '../user/models/user.models';
import { ActivityService } from '../activity/activity.service';
import { ReytingDto } from './dto/reyting.dto';
import { Tests } from '../test/models/test.models';
import { Lesson } from '../lesson/models/lesson.models';
import { Sequelize } from 'sequelize-typescript';
import { Role } from '../role/models/role.models';

@Injectable()
export class ReytingService {
  constructor(
    @InjectModel(Reyting) private reytingRepository: typeof Reyting,
  ) {}

  async create(reytingDto: ReytingDto): Promise<object> {
    try {
      const is_reyting = await this.reytingRepository.findOne({
        where: {
          role_id: reytingDto.role_id,
          test_id: reytingDto.test_id,
        },
      });
      if (!is_reyting) {
        const reyting = await this.reytingRepository.create(reytingDto);
        return {
          statusCode: HttpStatus.OK,
          message: 'Successfully added!',
          data: reyting,
        };
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Already added!',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // async login(loginReytingDto: LoginReytingDto): Promise<object> {
  //   try {
  //     const { phone, password } = loginReytingDto;
  //     const reyting = await this.reytingRepository.findOne({ where: { phone } });
  //     if (!reyting) {
  //       throw new NotFoundException('Telefon raqam yoki parol xato!');
  //     }
  //     const is_match_pass = await compare(password, reyting.hashed_password);
  //     if (!is_match_pass) {
  //       throw new ForbiddenException('Login yoki parol xato!');
  //     }
  //     // return this.otpService.sendOTP({ phone });
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }

  async getAll(subject_id: number): Promise<object> {
    try {
      const filter: any = [];
      if (subject_id != 0) {
        filter.push(
          Sequelize.literal(`
            "test_id" IN (
              SELECT "id" FROM "tests"
              WHERE "id" = "Reyting"."test_id"
              AND "lesson_id" IN (
                SELECT "id" FROM "lesson"
                WHERE "id" = "tests"."lesson_id"
                AND "subject_id" = ${subject_id}
              )
            )
          `),
        );
      }
      const reytings = await this.reytingRepository.findAll({
        where: {
          [Op.and]: [...filter],
        },
        include: [{ model: Role }],
      });
      return {
        statusCode: HttpStatus.OK,
        data: reytings,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async pagination(page: number, limit: number): Promise<object> {
    try {
      const offset = (page - 1) * limit;
      const reytings = await this.reytingRepository.findAll({ offset, limit });
      const total_count = await this.reytingRepository.count();
      const total_pages = Math.ceil(total_count / limit);
      const response = {
        statusCode: HttpStatus.OK,
        data: {
          records: reytings,
          pagination: {
            currentPage: Number(page),
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

  async delete(id: number): Promise<object> {
    try {
      const reyting = await this.reytingRepository.findByPk(id);
      if (!reyting) {
        throw new NotFoundException('Reyting not found');
      }
      reyting.destroy();
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
