import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.models';
import { NotificationModule } from 'src/notification/notification.module';
import { RoleModule } from 'src/role/role.module';
import { MailModule } from 'src/mail/mail.module';
import { ResetpasswordModule } from 'src/resetpassword/resetpassword.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(() => RoleModule),
    MailModule,
    ResetpasswordModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
