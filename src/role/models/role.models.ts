import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Reyting } from '../../reyting/models/reyting.models';
import { User } from '../../user/models/user.models';

interface RoleAttributes {
  subjects: string[];
  user_status: string;
  is_online: boolean;
  user_id: number;
  role: string;
  hashed_password: string;
  last_activity: Date;
}

export enum UserStatus {
  pending = 'pending',
  inprogress = 'inprogress',
  solved = 'solved',
}

export enum GenderType {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

@Table({ tableName: 'role' })
export class Role extends Model<Role, RoleAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  subjects: string[];

  @Column(
    DataType.ENUM({
      values: Object.keys(GenderType),
    }),
  )
  gender: GenderType;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  get_answered: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  new_task: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  chat_messages: boolean;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  test_reyting: number;

  @Column({
    type: DataType.ENUM({
      values: Object.keys(UserStatus),
    }),
    defaultValue: UserStatus.pending,
  })
  user_status: UserStatus;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_online: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  hashed_password: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  last_activity: Date;

  @HasMany(() => Reyting, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  reyting: Reyting[];
}
