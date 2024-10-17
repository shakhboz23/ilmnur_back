import { Module, forwardRef } from '@nestjs/common';
import { TestsService } from './test.service';
import { TestsController } from './test.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tests } from './models/test.models';
import { UserModule } from '../user/user.module';
import { ReytingModule } from '../reyting/reyting.module';
import { UserStepModule } from '../user_step/class.module';
import { Test_settingsModule } from '../test_settings/test_settings.module';

@Module({
  imports: [SequelizeModule.forFeature([Tests]), ReytingModule, UserStepModule, Test_settingsModule],
  controllers: [TestsController],
  providers: [TestsService], 
  exports: [TestsService],
})
export class TestsModule {}
