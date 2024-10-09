import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { News } from './models/news.model';
import { FilesModule } from '../files/files.module';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';
@Module({
  imports: [SequelizeModule.forFeature([News]), FilesModule, RoleModule, UserModule],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
