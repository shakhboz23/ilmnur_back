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
import { CourseService } from './course.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CourseDto } from './dto/course.dto';
import { JwtService } from '@nestjs/jwt';
import { ImageValidationPipe } from 'src/pipes/image-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { extractUserIdFromToken } from 'src/utils/token';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: 'Create a new course' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        price: {
          type: 'integer',
        },
        discount: {
          type: 'integer',
        },
        group_id: {
          type: 'integer',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/create')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() courseDto: CourseDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
    @Headers() headers: string
  ) {
    console.log(image);
    const user_id = extractUserIdFromToken(headers, this.jwtService);
    console.log(user_id);
    return this.courseService.create(courseDto, image);
  }

  @ApiOperation({ summary: 'Get course by ID' })
  // @UseGuards(AuthGuard)
  @Get('/getById/:id')
  getById(@Param('id') id: number) {
    return this.courseService.getById(id);
  }

  @ApiOperation({ summary: 'Get all courses' })
  // @UseGuards(AuthGuard)
  @Get('/')
  getAll(@Headers() headers?: string) {
    const auth_header = headers['authorization'];
    const token = auth_header?.split(' ')[1];
    const user = token
      ? this.jwtService.verify(token, { secret: process.env.ACCESS_TOKEN_KEY })
      : null;
    const user_id = user?.id;
    console.log(user_id, '565456');
    return this.courseService.getAll();
  }

  @ApiOperation({ summary: 'Get all courses' })
  // @UseGuards(AuthGuard)
  @Get('/getByCourse/:id')
  getByCourse(@Param('id') id: number) {
    return this.courseService.getByCourse(id);
  }

  @ApiOperation({ summary: 'Get courses with pagination' })
  // @UseGuards(AuthGuard)
  @Get('pagination/:page')
  pagination(@Param('page') page: number) {
    return this.courseService.pagination(page);
  }

  @ApiOperation({ summary: 'Update course profile by ID' })
  // @UseGuards(AuthGuard)
  @Put('/:id')
  update(@Param('id') id: number, @Body() courseDto: CourseDto) {
    return this.courseService.update(id, courseDto);
  }

  @ApiOperation({ summary: 'Delete course' })
  // @UseGuards(AuthGuard)
  @Delete(':id')
  deleteCourse(@Param('id') id: number) {
    return this.courseService.delete(id);
  }
}