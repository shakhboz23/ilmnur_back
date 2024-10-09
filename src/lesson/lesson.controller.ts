import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Headers,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LessonDto } from './dto/lesson.dto';
import { JwtService } from '@nestjs/jwt';
import { ImageValidationPipe } from 'src/pipes/image-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Lesson')
@Controller('lesson')
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: 'Create a new lesson' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        course_id: {
          type: 'number',
        },
        lesson_id: {
          type: 'number',
        },
        title: {
          type: 'string',
        },
        content: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
        published: {
          type: 'boolean',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() lessonDto: LessonDto,
    @UploadedFile(new ImageValidationPipe()) file: Express.Multer.File,
  ) {
    return this.lessonService.create(lessonDto, file);
  }

  @ApiOperation({ summary: 'Get lesson by ID' })
  // @UseGuards(AuthGuard)
  @Get('/getById/:id')
  getById(@Param('id') id: number) {
    return this.lessonService.getById(id);
  }

  @ApiOperation({ summary: 'Get all lessons' })
  // @UseGuards(AuthGuard)
  @Get('/')
  getAll(@Headers() headers?: string) {
    const auth_header = headers['authorization'];
    const token = auth_header?.split(' ')[1];
    console.log(token, 'token2303');
    const user = token
      ? this.jwtService.verify(token, { secret: process.env.ACCESS_TOKEN_KEY })
      : null;
    const user_id = user?.id;
    console.log(user_id, '565456');
    return this.lessonService.getAll();
  }

  @ApiOperation({ summary: 'Get all lessons' })
  // @UseGuards(AuthGuard)
  @Get('/getByCourse/:id')
  getByCourse(@Param('id') id: number) {
    return this.lessonService.getByCourse(id);
  }

  @ApiOperation({ summary: 'Get lessons with pagination' })
  // @UseGuards(AuthGuard)
  @Get('pagination/:page')
  pagination(@Param('page') page: number) {
    return this.lessonService.pagination(page);
  }

  @ApiOperation({ summary: 'Update lesson profile by ID' })
  // @UseGuards(AuthGuard)
  @Put('/:id')
  update(@Param('id') id: number, @Body() lessonDto: LessonDto) {
    return this.lessonService.update(id, lessonDto);
  }

  @ApiOperation({ summary: 'Delete lesson' })
  // @UseGuards(AuthGuard)
  @Delete(':id')
  deleteLesson(@Param('id') id: number) {
    return this.lessonService.delete(id);
  }
}
