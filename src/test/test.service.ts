import { Test_settingsService } from './../test_settings/test_settings.service';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Tests } from './models/test.models';
import { InjectModel } from '@nestjs/sequelize';
import { TestsDto } from './dto/test.dto';
import { Sequelize } from 'sequelize-typescript';
import { CheckDto } from './dto/check.dto';
import { ReytingService } from 'src/reyting/reyting.service';
import { ReytingDto } from 'src/reyting/dto/reyting.dto';
import { UserStepService } from 'src/user_step/class.service';

@Injectable()
export class TestsService {
  constructor(
    @InjectModel(Tests) private testsRepository: typeof Tests,
    private readonly reytingService: ReytingService,
    private readonly userStepService: UserStepService,
    private readonly test_settingsService: Test_settingsService,
  ) {}

  async create(testsDto: TestsDto): Promise<object> {
    try {
      const {
        test,
        lesson_id,
        start_date,
        end_date,
        sort_level,
        test_count,
        period,
      } = testsDto;
      let variants: string[];
      if (start_date || end_date || sort_level || test_count || period) {
        await this.test_settingsService.create({
          lesson_id,
          start_date,
          end_date,
          sort_level,
          test_count,
          period,
        });
      }
      for (let i = 1; i <= Object.keys(test).length; i++) {
        variants = Object.values(test[i].variant);
        await this.testsRepository.create({
          lesson_id,
          question: test[i].question[0],
          variants: [...variants],
        });
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Created successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAll(class_name: number): Promise<object> {
    try {
      const tests = await this.testsRepository.findAll({
        attributes: {
          include: [
            [
              Sequelize.literal(
                `(SELECT COUNT(*) FROM "lesson" WHERE "lesson"."id" = "Tests"."lesson_id" and "lesson"."class" = ${class_name})`,
              ),
              'lessonsCount',
            ],
            [
              Sequelize.literal(`(
                SELECT SUM("uploaded"."duration")
                FROM "lesson"
                INNER JOIN "video_lesson" ON "lesson"."id" = "video_lesson"."lesson_id"
                INNER JOIN "uploaded" ON "video_lesson"."video_id" = "uploaded"."id"  
                WHERE "lesson"."id" = "Tests"."lesson_id"
                AND "lesson"."class" = '${class_name}'
              )`),
              'totalDuration',
            ],
          ],
        },
      });
      return {
        statusCode: HttpStatus.OK,
        data: tests,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTests(): Promise<object> {
    try {
      const testss = await this.testsRepository.findAll();
      return {
        statusCode: HttpStatus.OK,
        data: testss,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getById(id: number): Promise<object> {
    try {
      const test_settings: any =
        await this.test_settingsService.getByLessonId(id);
      console.log(test_settings);
      console.log(
        new Date(test_settings?.data?.end_date).getTime(),
        'test2303',
      );
      if (
        new Date(test_settings?.data?.start_date).getTime() >
        new Date().getTime()
      ) {
        throw new BadRequestException('start date is invalid');
      } else if (
        new Date(test_settings?.data?.end_date).getTime() < new Date().getTime()
      ) {
        throw new BadRequestException('end date is invalid');
      }

      const tests = await this.testsRepository.findAll({
        where: {
          lesson_id: id,
        },
      });

      if (!tests) {
        throw new NotFoundException('Tests not found');
      }

      const randomizedVariants = this.shuffle(tests).map((variant) => {
        const randomizedOptions = this.shuffle(variant.get('variants'));
        return {
          ...variant.toJSON(),
          variants: randomizedOptions,
        };
      });

      return {
        statusCode: HttpStatus.OK,
        data: randomizedVariants,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async checkById(id: number, answer: string): Promise<object> {
    try {
      const test = await this.testsRepository.findByPk(id);
      if (!test) {
        throw new NotFoundException('Tests not found');
      }
      if (test.variants[0] == answer) {
        return [id, true];
      }
      return [id, false];
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async checkAnswers(role_id: number, checkDto: CheckDto): Promise<object> {
    const { answers, lesson_id } = checkDto;
    let message: string;
    try {
      const results = {};
      let student: any;
      let res: object, id: number, answer: string;
      for (let i of answers) {
        id = +i[0];
        answer = i[1];
        res = await this.checkById(id, answer);
        results[res[0]] = res[1];
      }
      let ball = 0;
      for (let i in results) {
        if (results[i]) {
          ball += 1;
        }
      }
      const percentage = (ball / Object.keys(results)?.length) * 100;
      if (percentage >= 70) {
        const data: ReytingDto = {
          role_id,
          ball,
          test_id: id,
        };
        const reyting_data: any = await this.reytingService.create(data);
        await this.userStepService.create({ lesson_id, role_id });
        if (reyting_data.message == 'Already added!') {
          message = 'Already added!';
        }
      }

      return {
        statusCode: HttpStatus.OK,
        data: {
          results,
          ball: [percentage, ball],
          student,
          message,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // async getByTitle(title: string): Promise<object> {
  //   try {
  //     const tests = await this.testsRepository.findOne({
  //       where: { title },
  //     });
  //     if (!tests) {
  //       throw new NotFoundException('Tests not found');
  //     }
  //     return {
  //       statusCode: HttpStatus.OK,
  //       data: tests,
  //     };
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }

  async pagination(page: number): Promise<object> {
    try {
      const offset = (page - 1) * 10;
      const limit = 10;
      const testss = await this.testsRepository.findAll({ offset, limit });
      const total_count = await this.testsRepository.count();
      const total_pages = Math.ceil(total_count / 10);
      const response = {
        statusCode: HttpStatus.OK,
        data: {
          records: testss,
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

  async update(id: number, testsDto: TestsDto): Promise<object> {
    try {
      const tests = await this.testsRepository.findByPk(id);
      if (!tests) {
        throw new NotFoundException('Tests not found');
      }
      const update = await this.testsRepository.update(testsDto, {
        where: { id },
        returning: true,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Updated successfully',
        data: {
          tests: update[1][0],
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: number): Promise<object> {
    try {
      const tests = await this.testsRepository.findByPk(id);
      if (!tests) {
        throw new NotFoundException('Tests not found');
      }
      tests.destroy();
      return {
        statusCode: HttpStatus.OK,
        message: 'Deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Function to shuffle an array
  private shuffle(array: any[]): any[] {
    const shuffledArray = [...array];
    const data = [];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }
}
