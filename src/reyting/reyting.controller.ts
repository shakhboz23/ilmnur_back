import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseInterceptors,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import { ReytingService } from './reyting.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from '../pipes/image-validation.pipe';
import { ReytingDto } from './dto/reyting.dto';

@ApiTags('Reyting')
@Controller('reyting')
export class ReytingController {
  constructor(
    private readonly reytingService: ReytingService,
    // private readonly chatGateway: ChatGateway,ChatGateway
  ) {}

  @ApiOperation({ summary: 'Registration a new reyting' })
  @Post('/create')
  async create(@Body() reytingDto: ReytingDto) {
    return this.reytingService.create(reytingDto);
  }

  @ApiOperation({ summary: 'Get all reytings' })
  // @UseGuards(AuthGuard)
  @Get('/getall/:subject_id')
  getAll(@Param('subject_id') subject_id: number) {
    return this.reytingService.getAll(subject_id);
  }

  @ApiOperation({ summary: 'Get reytings with pagination' })
  // @UseGuards(AuthGuard)
  @Get('pagination/:page/:limit')
  pagination(@Param('page') page: number, @Param('limit') limit: number) {
    return this.reytingService.pagination(page, limit);
  }

  // @ApiOperation({ summary: 'Update user profile by ID' })
  // // @UseGuards(AuthGuard)
  // @Put('profile/:id')
  // update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
  //   return this.reytingService.update(id, updateDto);
  // }

  @ApiOperation({ summary: 'Delete reyting by ID' })
  // @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.reytingService.delete(id);
  }
}
