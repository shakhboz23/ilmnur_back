import { Module, forwardRef } from '@nestjs/common';
import { TestsService } from './test.service';
import { TestsController } from './test.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tests } from './models/test.models';
import { UserModule } from 'src/user/user.module';
import { ReytingModule } from 'src/reyting/reyting.module';
import { UserStepModule } from 'src/user_step/class.module';
import { Test_settingsModule } from 'src/test_settings/test_settings.module';

@Module({
  imports: [SequelizeModule.forFeature([Tests]), ReytingModule, UserStepModule, Test_settingsModule],
  controllers: [TestsController],
  providers: [TestsService], 
  exports: [TestsService],
})
export class TestsModule {}
