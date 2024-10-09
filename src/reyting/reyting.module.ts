import { Module, forwardRef } from '@nestjs/common';
import { ReytingService } from './reyting.service';
import { ReytingController } from './reyting.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reyting } from './models/reyting.models';
import { FilesModule } from 'src/files/files.module'; // Verify import path
import { NotificationModule } from 'src/notification/notification.module';
import { UserModule } from 'src/user/user.module';
import { ActivityModule } from 'src/activity/activity.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Reyting]),
  ],
  controllers: [ReytingController],
  providers: [ReytingService],
  exports: [ReytingService],
})
export class ReytingModule {}
