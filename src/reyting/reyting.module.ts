import { Module, forwardRef } from '@nestjs/common';
import { ReytingService } from './reyting.service';
import { ReytingController } from './reyting.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reyting } from './models/reyting.models';
import { FilesModule } from '../files/files.module'; // Verify import path
import { NotificationModule } from '../notification/notification.module';
import { UserModule } from '../user/user.module';
import { ActivityModule } from '../activity/activity.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Reyting]),
  ],
  controllers: [ReytingController],
  providers: [ReytingService],
  exports: [ReytingService],
})
export class ReytingModule {}
