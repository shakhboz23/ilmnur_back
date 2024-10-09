import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './models/chat.model';
import { FilesModule } from '../files/files.module';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Chat]),
    RoleModule,
    UserModule,
    FilesModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatController],
  exports: [ChatService],
})
export class ChatModule {}
