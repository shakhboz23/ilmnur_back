import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Group } from './models/group.models';
import { InjectModel } from '@nestjs/sequelize';
import { GroupDto } from './dto/group.dto';
import { UploadedService } from 'src/uploaded/uploaded.service';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/user/models/user.models';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group) private groupRepository: typeof Group,
    private readonly uploadedService: UploadedService,
  ) {}

  async create(
    groupDto: GroupDto,
    user_id: number,
    cover: any,
  ): Promise<object> {
    console.log(cover);
    try {
      console.log('Hi');
      const { title } = groupDto;
      const exist = await this.groupRepository.findOne({
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
        console.log(file_data.data);
        image_url = file_data.data.url;
      }
      const group = await this.groupRepository.create({
        ...groupDto,
        user_id,
        cover: image_url,
      });

      return group;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAll(user_id?: number, type?: string): Promise<object> {
    try {
      const filters: any = {
        order: [['title', 'ASC']],
        include: [{ model: User }],
        attributes: {
          include: [
            [
              Sequelize.literal(
                `(SELECT COUNT(*) FROM "course" WHERE "course"."group_id" = "Group"."id")::int`,
              ),
              'courses_count',
            ],
            [
              Sequelize.literal(
                `COALESCE((SELECT MIN("course"."price") FROM "course" WHERE "course"."group_id" = "Group"."id")::int, 0)`,
              ),
              'low_price',
            ],
            [
              Sequelize.literal(
                `COALESCE((SELECT MAX("course"."price") FROM "course" WHERE "course"."group_id" = "Group"."id")::int, 0)`,
              ),
              'high_price',
            ],
          ],
        },
      };

      const groups = await this.groupRepository.findAll({
        ...filters,
      });
      let my_groups = [];
      if (user_id) {
        my_groups = await this.groupRepository.findAll({
          where: { user_id },
          ...filters,
        });
      }


      return {
        groups,
        my_groups,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getById(id: number): Promise<object> {
    try {
      const groups = await this.groupRepository.findOne({
        where: { id },
      });
      console.log(groups);
      if (!groups) {
        throw new NotFoundException('Group not found');
      }
      return {
        statusCode: HttpStatus.OK,
        data: groups,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async pagination(page: number): Promise<object> {
    try {
      const offset = (page - 1) * 10;
      const limit = 10;
      const groups = await this.groupRepository.findAll({ offset, limit });
      const total_count = await this.groupRepository.count();
      const total_pages = Math.ceil(total_count / 10);
      const response = {
        statusCode: HttpStatus.OK,
        data: {
          records: groups,
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

  async update(id: number, groupDto: GroupDto): Promise<object> {
    try {
      const groupes = await this.groupRepository.findByPk(id);
      if (!groupes) {
        throw new NotFoundException('Group not found');
      }
      const update = await this.groupRepository.update(groupDto, {
        where: { id },
        returning: true,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Updated successfully',
        data: {
          group: update[1][0],
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: number): Promise<object> {
    try {
      const groupes = await this.groupRepository.findByPk(id);
      if (!groupes) {
        throw new NotFoundException('Group not found');
      }
      groupes.destroy();
      return {
        statusCode: HttpStatus.OK,
        message: 'Deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
