import { RoleService } from 'src/role/role.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { CheckDto } from './dto/check.dto';
import { NewPasswordDto } from './dto/new-password.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  @ApiOperation({ summary: 'Registration a new user' })
  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.userService.register(registerUserDto, res);
    return data;
  }

  @Get('activation_link/:activation_link')
  activate(@Param('activation_link') activation_link: string) {
    return this.userService.activateLink(activation_link);
  }

  @ApiOperation({ summary: 'Login user with send OTP' })
  @Post('login')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
    // @Req() req: Request,
  ) {
    // const userAgent = req.headers['user-agent'];
    // const ua = new UserAgent(userAgent);

    // const browser = ua.browser; // String representing the browser name (e.g., 'Chrome')
    // const version = ua.version; // String representing the browser version (e.g., '107.0.0.0')
    // const os = ua.os; // Object containing information about the operating system

    // console.log(`Browser: ${browser}, Version: ${version}, OS: ${os.name}`);
    return this.userService.login(loginUserDto, res);
  }

  // @ApiOperation({ summary: 'Login user with send OTP' })
  // @Post('/addchild')
  // addChild(@Body() addChildDto: AddChildDto) {
  //   // return this.userService.addChild(addChildDto);
  // }

  @ApiOperation({ summary: 'Get all users' })
  // @UseGuards(AuthGuard)
  @Get('getByRole/:role')
  getAll(@Param('role') role: string) {
    return this.userService.getAll(role);
  }

  @ApiOperation({ summary: 'Get user reytings' })
  @Get('/reyting')
  getReyting() {
    return this.userService.getReyting();
  }

  @ApiOperation({ summary: 'Get user by ID' })
  // @UseGuards(AuthGuard)
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.userService.getById(id);
  }

  @ApiOperation({ summary: 'Get users with pagination' })
  // @UseGuards(AuthGuard)
  @Get('pagination/:page/:limit')
  pagination(@Param('page') page: number, @Param('limit') limit: number) {
    return this.userService.pagination(page, limit);
  }

  @ApiOperation({ summary: 'Get users with pagination' })
  // @UseGuards(AuthGuard)
  @Get('searchusers/:search/:page')
  searchUsers(@Param('page') page: number, @Param('search') search: string) {
    return this.userService.searchUsers(page, search);
  }

  @ApiOperation({ summary: 'Get users with pagination' })
  // @UseGuards(AuthGuard)
  @Get('checkemail/:email')
  checkEmail(@Param('email') email: string) {
    return this.userService.checkEmail(email);
  }

  @ApiOperation({ summary: 'Update user profile by ID' })
  // @UseGuards(AuthGuard)
  @Post('/check_password')
  checkPassword(@Body() checkDto: CheckDto) {
    return this.userService.checkPassword(checkDto);
  }

  @ApiOperation({ summary: 'New password of user' })
  // @UseGuards(AuthGuard)
  @Put('/newPassword')
  newPassword(@Body() newPasswordDto: NewPasswordDto) {
    return this.userService.newPassword(newPasswordDto);
  }

  // @ApiOperation({ summary: 'Forgot password for user' })
  // // @UseGuards(AuthGuard)
  // @Put('forgotPassword/:id')
  // forgotPassword(
  //   @Param('id') id: string,
  //   @Body() forgotPasswordDto: ForgotPasswordDto,
  // ) {
  //   return this.userService.forgotPassword(id, forgotPasswordDto);
  // }

  // @ApiOperation({ summary: 'Update user profile by ID' })
  // // @UseGuards(AuthGuard)
  // @Put('profile/:id')
  // update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
  //   return this.userService.update(id, updateDto);
  // }

  // create_app(
  //   @Body() chatDto: ChatDto,
  //   @UploadedFile(new ImageValidationPipe()) file: Express.Multer.File,
  // ) {
  //   return this.chatService.create(chatDto, file);
  // }

  // @ApiOperation({ summary: 'Update profile image' })
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       image: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  // // @UseGuards(AuthGuard)
  // @Put('profileImage/:id')
  // @UseInterceptors(FileInterceptor('image'))
  // updateProfileImage(
  //   @Param('id') id: string,
  //   @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  // ) {
  //   return this.userService.updateProfileImage(id, image);
  // }

  @ApiOperation({ summary: 'Delete user by ID' })
  // @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  // @ApiOperation({ summary: 'Get orders with pagination' })
  // @Get('orders/pagination/:page/:limit')
  // orderPagination(@Param('page') page: number, @Param('limit') limit: number) {
  //   return this.orderService.pagination(page, limit);
  // }

  @ApiOperation({ summary: 'Delete user by ID' })
  // @UseGuards(AuthGuard)
  @Post('/auth/google')
  googleAuth(
    @Body() { credential }: { credential: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.googleAuth(credential, res);
  }
}