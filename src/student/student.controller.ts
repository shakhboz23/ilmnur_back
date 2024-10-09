import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CookieGetter } from 'src/decorators/cookieGetter.decorator';
import { NewPasswordDto } from './dto/new-password.dto';
import { RegisterStudentDto } from './dto/register.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChatDto } from '../chat/dto/chat.dto';
import { ImageValidationPipe } from '../pipes/image-validation.pipe';
import { LoginStudentDto } from './dto/login.dto';
import { UpdateDto } from './dto/update.dto';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({ summary: 'Registration a new student' })
  @Post('register')
  register(
    @Body() registerStudentDto: RegisterStudentDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.studentService.register(registerStudentDto);
  }

  @ApiOperation({ summary: 'Login student with send OTP' })
  @Post('login')
  login(
    @Body() loginStudentDto: LoginStudentDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.studentService.login(loginStudentDto, res);
  }

  // @ApiOperation({ summary: 'Verify login student' })
  // @Post('verifyLogin')
  // verifLogin(
  //   @Body() verifyOtpDto: VerifyOtpDto,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   return this.studentService.verifyLogin(verifyOtpDto, res);
  // }

  @ApiOperation({ summary: 'Get all students' })
  // @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.studentService.getAll();
  }

  @ApiOperation({ summary: 'Get student reytings' })
  @Get('/reyting')
  getReyting() {
    return this.studentService.getReyting();
  }

  @ApiOperation({ summary: 'Get student by ID' })
  // @UseGuards(AuthGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.studentService.getById(id);
  }

  @ApiOperation({ summary: 'Get students with pagination' })
  // @UseGuards(AuthGuard)
  @Get('pagination/:page/:limit')
  pagination(@Param('page') page: number, @Param('limit') limit: number) {
    return this.studentService.pagination(page, limit);
  }

  // @ApiOperation({ summary: 'New password of student' })
  // // @UseGuards(AuthGuard)
  // @Put('newPassword/:id')
  // newPassword(@Param('id') id: string, @Body() newPasswordDto: NewPasswordDto) {
  //   return this.studentService.newPassword(id, newPasswordDto);
  // }

  // @ApiOperation({ summary: 'Forgot password for student' })
  // // @UseGuards(AuthGuard)
  // @Put('forgotPassword/:id')
  // forgotPassword(
  //   @Param('id') id: string,
  //   @Body() forgotPasswordDto: ForgotPasswordDto,
  // ) {
  //   return this.studentService.forgotPassword(id, forgotPasswordDto);
  // }

  @ApiOperation({ summary: 'Update student profile by ID' })
  // @UseGuards(AuthGuard)
  @Put('profile/:id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ) {
    return this.studentService.update(id, updateDto);
  }

  
  // create_app(
  //   @Body() chatDto: ChatDto,
  //   @UploadedFile(new ImageValidationPipe()) file: Express.Multer.File,
  // ) {
  //   return this.chatService.create(chatDto, file);
  // }

  @ApiOperation({ summary: 'Update profile image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  // @UseGuards(AuthGuard)
  @Put('profileImage/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateProfileImage(
    @Param('id') id: string,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.studentService.updateProfileImage(id, image);
  }

  @ApiOperation({ summary: 'Delete student by ID' })
  // @UseGuards(AuthGuard)
  @Delete(':id')
  deleteStudent(@Param('id') id: string) {
    return this.studentService.deleteStudent(id);
  }

  // @ApiOperation({ summary: 'Get orders with pagination' })
  // @Get('orders/pagination/:page/:limit')
  // orderPagination(@Param('page') page: number, @Param('limit') limit: number) {
  //   return this.orderService.pagination(page, limit);
  // }
}
