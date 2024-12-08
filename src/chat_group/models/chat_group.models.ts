import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ChatGroupType } from '../dto/chat_group.dto';
import { Chat } from '../../chat/models/chat.model';
import { Group } from 'src/group/models/group.models';
import { Course } from 'src/course/models/course.models';

interface ChatGroupAttributes {
  title: string;
  group_id: number;
  chat_type: ChatGroupType;
}

@Table({ tableName: 'chatgroup' })
export class ChatGroup extends Model<ChatGroup, ChatGroupAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  // @Column({
  //   type: DataType.STRING,
  //   allowNull: false,
  // })
  // title: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.STRING,
  })
  title: string;

  // @BelongsTo(() => Course)
  @BelongsTo(() => Course, { foreignKey: 'title', targetKey: 'title' })
  course: Course[];

  @Column(
    DataType.ENUM({
      values: Object.keys(ChatGroupType),
    }),
  )
  chat_type: ChatGroupType;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
  })
  group_id: number;

  @BelongsTo(() => Group)
  group: Group[];

  @HasMany(() => Chat, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  chats: Chat[];
}