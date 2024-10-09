import { ResetpasswordService } from './../resetpassword/resetpassword.service';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { User } from './models/user.models';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { RegisterUserDto } from './dto/register.dto';
import { generateToken, writeToCookie } from 'src/utils/token';
import { LoginUserDto } from './dto/login.dto';
import { Op } from 'sequelize';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationDto } from 'src/notification/dto/notification.dto';
import { RoleService } from 'src/role/role.service';
import { RoleDto } from 'src/role/dto/role.dto';
import { Role } from 'src/role/models/role.models';
import { CheckDto } from 'src/role/dto/check.dto';
import { MailService } from 'src/mail/mail.service';
import { compareSync, hash } from 'bcryptjs';
import * as uuid from 'uuid';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { NewPasswordDto } from './dto/new-password.dto';
import { OAuth2Client } from 'google-auth-library';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
    private readonly mailService: MailService,
    private readonly resetpasswordService: ResetpasswordService,
  ) {}
  async register(
    registerUserDto: RegisterUserDto,
    res: Response,
  ): Promise<object> {
    try {
      let is_new_role = false;
      let { email, role, password } = registerUserDto;
      if (role == 'student') {
        registerUserDto.subjects = [];
      }
      const hashed_password: string = await hash(password, 7);
      let user = await this.userRepository.findOne({
        where: { email },
      });
      let is_role: any;
      if (user) {
        is_role = await this.roleService.getUserRoles(user.id, role);
        if (is_role.data?.length) {
          throw new BadRequestException('Already registered');
        } else {
          is_new_role = true;
        }
      }
      const current_role: string = registerUserDto.role;
      if (is_new_role) {
        const roleData: RoleDto = {
          ...registerUserDto,
          user_id: user.id,
        };
        await this.roleService.create(roleData);
        user = await this.userRepository.findByPk(user.id);
        await this.updateCurrentRole(user.id, current_role);
        const { access_token, refresh_token } = await generateToken(
          { id: user.id },
          this.jwtService,
        );
        await writeToCookie(refresh_token, res);
        const user_data: any = await this.userRepository.findByPk(user.id, {
          include: { model: Role },
        });

        return {
          statusCode: HttpStatus.OK,
          message: 'Successfully registered1!',
          data: {
            user: user_data,
          },
          token: access_token,
        };
      } else {
        user = await this.userRepository.create({
          ...registerUserDto,
          hashed_password,
        });
        const { access_token, refresh_token } = await generateToken(
          { id: user.id, is_active: user.is_active },
          this.jwtService,
        );
        const hashed_refresh_token = await hash(refresh_token, 7);

        const uniqueKey: string = uuid.v4();

        const updateuser = await this.userRepository.update(
          {
            hashed_refresh_token: hashed_refresh_token,
            activation_link: uniqueKey,
          },
          { where: { id: user.id }, returning: true },
        );

        await this.mailService.sendUserConfirmation(updateuser[1][0]);
        await writeToCookie(refresh_token, res);

        const roleData: RoleDto = {
          ...registerUserDto,
          user_id: user.id,
        };
        await this.roleService.create(roleData);
        // if (role == 'student') {
        //   const data: NotificationDto = {
        //     type: 'student',
        //     user_id: user.id,
        //   };
        //   this.notificationService.create(data);
        // }
        await this.updateCurrentRole(user.id, current_role);

        const user_data: any = await this.userRepository.findByPk(user.id, {
          include: { model: Role },
        });

        await this.mailService.sendUserConfirmation(user_data);

        return {
          statusCode: HttpStatus.OK,
          message: 'Verification code sended successfully',
          token: access_token,
        };
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async activateLink(activation_link: string) {
    if (!activation_link) {
      throw new BadRequestException('Activation link not found');
    }
    const user = await this.userRepository.findOne({
      where: { activation_link },
    });
    if (!user) {
      throw new BadRequestException('Activation link not found');
    } else if (user?.is_active) {
      throw new BadRequestException('User already activated');
    }
    const updateduser = await this.userRepository.update(
      { is_active: true },
      { where: { activation_link }, returning: true },
    );
    return {
      message: 'User activated successfully',
      admin: updateduser[1][0],
    };
  }

  async login(loginUserDto: LoginUserDto, res: Response, type?: string): Promise<object> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: loginUserDto.email },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (type != 'googleauth') {
        const isMatchPass = await bcrypt.compare(
          loginUserDto.password,
          user.hashed_password,
        );
        if (!isMatchPass) {
          throw new BadRequestException('Password did not match!');
        }
      }

      const { access_token, refresh_token } = await generateToken(
        { id: user.id },
        this.jwtService,
      );
      await writeToCookie(refresh_token, res);
      return {
        statusCode: HttpStatus.OK,
        mesage: 'Logged in successfully',
        data: user,
        token: access_token,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAll(role: string): Promise<object> {
    try {
      console.log(role);
      const where: any = {};
      if (role != 'all') {
        where.role = { [Op.contains]: [[role, '']] };
      }
      const users = await this.userRepository.findAll({ where });
      return {
        statusCode: HttpStatus.OK,
        data: users,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getReyting(): Promise<object> {
    try {
      const users = await this.userRepository.findAll({
        // where: {
        //   test_reyting: {
        //     [Op.gt]: 0,
        //   },
        // },
        order: [['test_reyting', 'DESC']],
      });
      return {
        statusCode: HttpStatus.OK,
        data: users,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getById(id: number): Promise<object> {
    console.log('getById', id);
    try {
      if (!id) {
        throw new NotFoundException('User not found!');
      }
      const userdata: any = await this.userRepository.findByPk(id);
      const current_role: string = userdata.current_role;
      const user = await this.userRepository.findOne({
        where: { id },
        include: [
          {
            model: Role,
            attributes: {
              include: [
                // [
                //   Sequelize.literal(`
                //     (
                //       SELECT json_agg(json_build_object('id', s.id, 'title', s.title)) AS subjects
                //       FROM "subject" AS s
                //       JOIN "role" AS r ON s.id = ANY(r.subjects::int[])
                //       WHERE r."user_id" = :id
                //     )
                //   `),
                //   'subjects',
                // ],
                [
                  Sequelize.literal(`
                    (
                      SELECT json_agg(s.title) AS subjects
                      FROM "subject" AS s
                      JOIN "role" AS r ON s.id = ANY(r.subjects::int[])
                      WHERE r."user_id" = :id AND r."role" = :current_role
                    )
                  `),
                  'subjects',
                ],
              ],
            },
          },
        ],
        replacements: { id, current_role },
      });
      if (!user) {
        throw new NotFoundException('User not found!');
      }
      return {
        statusCode: HttpStatus.OK,
        data: user,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async searchUsers(page: number, search: string): Promise<object> {
    try {
      const limit = 20;
      const offset = (page - 1) * limit;
      const users = await this.userRepository.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { surname: { [Op.iLike]: `%${search}%` } },
          ],
        },
        include: { model: Role, where: { role: 'student' } },
        offset,
        limit,
      });
      const total_count = await this.userRepository.count({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { surname: { [Op.like]: `%${search}%` } },
          ],
        },
      });
      const total_pages = Math.ceil(total_count / limit);
      const response = {
        statusCode: HttpStatus.OK,
        data: {
          records: users,
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

  async checkEmail(email: string): Promise<object> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      return {
        statusCode: HttpStatus.OK,
        data: user,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async pagination(page: number, limit: number): Promise<object> {
    try {
      const offset = (page - 1) * limit;
      const users = await this.userRepository.findAll({ offset, limit });
      const total_count = await this.userRepository.count();
      const total_pages = Math.ceil(total_count / limit);
      const response = {
        statusCode: HttpStatus.OK,
        data: {
          records: users,
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

  async checkPassword(checkDto: CheckDto) {
    const res: any = await this.roleService.checkPassword(checkDto);
    if (res) {
      const user: any = await this.updateCurrentRole(
        res.data.id,
        res.data.role,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Updated successfully',
        data: user.data,
      };
    }
  }

  async newPassword(newPasswordDto: NewPasswordDto): Promise<object> {
    try {
      const { new_password, confirm_password, activation_link } =
        newPasswordDto;
      const email =
        await this.resetpasswordService.checkActivationLink(activation_link);
      const hashed_password = await hash(new_password, 7);
      const updated_info = await this.userRepository.update(
        { hashed_password },
        { where: { email }, returning: true },
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Password updated successfully',
        data: {
          user: updated_info[1][0],
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // async newPassword(
  //   id: string,
  //   newPasswordDto: NewPasswordDto,
  // ): Promise<object> {
  //   try {
  //     const { old_password, new_password } = newPasswordDto;
  //     const user = await this.userRepository.findByPk(id);
  //     if (!user) {
  //       throw new NotFoundException('User not found!');
  //     }
  //     const is_match_pass = await compare(old_password, user.hashed_password);
  //     if (!is_match_pass) {
  //       throw new ForbiddenException('The old password did not match!');
  //     }
  //     const hashed_password = await hash(new_password, 7);
  //     const updated_info = await this.userRepository.update(
  //       { hashed_password },
  //       { where: { id }, returning: true },
  //     );
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: "Parol o'zgartirildi",
  //       data: {
  //         user: updated_info[1][0],
  //       },
  //     };
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }

  // async forgotPassword(
  //   id: string,
  //   forgotPasswordDto: ForgotPasswordDto,
  // ): Promise<object> {
  //   try {
  //     const { phone, code, new_password, confirm_new_password } =
  //       forgotPasswordDto;
  //     await this.otpService.verifyOtp({ phone, code });
  //     await this.getById(id);
  //     if (new_password != confirm_new_password) {
  //       throw new ForbiddenException('Yangi parolni tasdiqlashda xatolik!');
  //     }
  //     const hashed_password = await hash(new_password, 7);
  //     const updated_info = await this.userRepository.update(
  //       { hashed_password },
  //       { where: { id }, returning: true },
  //     );
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: "Paroli o'zgartirildi",
  //       data: {
  //         user: updated_info[1][0],
  //       },
  //     };
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }

  async update(id: number, updateDto: UpdateDto): Promise<object> {
    try {
      const user = await this.userRepository.findByPk(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      console.log(updateDto, id);
      const update = await this.userRepository.update(updateDto, {
        where: { id },
        returning: true,
      });
      console.log(update);
      return {
        statusCode: HttpStatus.OK,
        message: 'Updated successfully',
        data: update[1][0],
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateCurrentRole(id: number, current_role: string): Promise<object> {
    try {
      const user = await this.userRepository.findByPk(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const update = await this.userRepository.update(
        { current_role },
        {
          where: { id },
          returning: true,
        },
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Updated successfully',
        data: update[1][0],
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // async updateTestReyting(id: number): Promise<object> {
  //   try {
  //     console.log(id, '-----------------------');
  //     const user = await this.userRepository.findByPk(id);
  //     if (!user) {
  //       throw new NotFoundException('User not found');
  //     }
  //     const test_reyting = user.test_reyting + 1;
  //     const update = await this.userRepository.update(
  //       { test_reyting },
  //       {
  //         where: { id },
  //         returning: true,
  //       },
  //     );
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: 'Updated successfully',
  //       data: update[1][0],
  //     };
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }

  async deleteUser(id: string): Promise<object> {
    try {
      const user = await this.userRepository.findByPk(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      user.destroy();
      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async verify(token: string) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    return payload;
  }

  async googleAuth(credential: string, res: Response) {
    console.log(credential, 'credential');
    try {
      const payload: any = await this.verify(credential);
      console.log(payload)
      const data: any = {
        name: payload.given_name,
        surname: payload.family_name,
        password: credential,
        email: payload.email,
        role: 'student'
      };
      const is_user = await this.userRepository.findOne({
        where: {
          email: payload.email,
        }
      })
      let user: any;
      console.log(is_user);
      if (is_user) {
        user = await this.login(data, res, 'googleauth')
      } else {
        user = await this.register(data, res);
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
