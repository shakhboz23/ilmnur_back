import { ChatGateway } from '../gateway/gateway';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { GroupService } from './group.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GroupDto } from './dto/group.dto';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { ImageValidationPipe } from '../pipes/image-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { extractUserIdFromToken } from '../utils/token';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Group')
@WebSocketGateway({ cors: { origin: '*', credentials: true } }) // cors
@Controller('group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly jwtService: JwtService,
    private readonly chatGateway: ChatGateway,
  ) {}

  @ApiOperation({ summary: 'Create a new group' })
  @ApiBearerAuth()
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
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() groupDto: GroupDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
    @Headers() headers: Record<string, string>,
  ) {
    const user_id = extractUserIdFromToken(headers, this.jwtService);
    console.log(image);
    console.log(image, 'djskd');
    return this.groupService.create(groupDto, user_id, image);
  }

  @ApiOperation({ summary: 'Get group by ID' })
  // @UseGuards(AuthGuard)
  @Get('/getById/:id')
  getById(@Param('id') id: number) {
    return this.groupService.getById(id);
  }

  @ApiOperation({ summary: 'Get all groups' })
  // @UseGuards(AuthGuard)
  // @ApiBearerAuth()
  @Get()
  getAll(@Headers() headers: string) {
    console.log(headers);
    const user_id = extractUserIdFromToken(headers, this.jwtService, true);
    return this.groupService.getAll(user_id);
  }

  @ApiOperation({ summary: 'Get all groups' })
  // @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  getMyGroup(@Headers() headers: string) {
    const user_id = extractUserIdFromToken(headers, this.jwtService);
    return this.groupService.getAll(user_id, 'my_groups');
  }

  @ApiOperation({ summary: 'Get groups with pagination' })
  // @UseGuards(AuthGuard)
  @Get('pagination/:page')
  pagination(@Param('page') page: number) {
    return this.groupService.pagination(page);
  }

  @ApiOperation({ summary: 'Update group profile by ID' })
  // @UseGuards(AuthGuard)
  @Put('/:id')
  update(@Param('id') id: number, @Body() groupDto: GroupDto) {
    return this.groupService.update(id, groupDto);
  }

  @ApiOperation({ summary: 'Delete group' })
  // @UseGuards(AuthGuard)
  @Delete(':id')
  deleteGroup(@Param('id') id: number) {
    return this.groupService.delete(id);
  }
}
