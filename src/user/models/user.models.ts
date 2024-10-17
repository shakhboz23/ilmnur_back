import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Activity } from '../../activity/models/activity.models';
import { Chat } from '../../chat/models/chat.model';
import { Role } from '../../role/models/role.models';

interface UserAttributes {
  name: string;
  surname: string;
  email: string;
  current_role: string;
  is_active: boolean;
  hashed_password: string;
  hashed_refresh_token: string;
}

export enum RoleName {
  student = 'student',
  teacher = 'teacher',
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  surname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
  })
  current_role: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @HasMany(() => Chat, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  chats: Chat[];

  @HasMany(() => Role, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  role: Role[];

  @HasMany(() => Activity, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  activity: Activity[];
}
