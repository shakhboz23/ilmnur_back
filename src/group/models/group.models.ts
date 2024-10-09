import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/models/user.models';

interface GroupAttributes {
  title: string;
  description: string;
  cover: string;
  user_id: number;
}

@Table({ tableName: 'group' })
export class Group extends Model<Group, GroupAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  cover: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User[];

  // @HasMany(() => Lesson, {
  //   onDelete: 'CASCADE',
  //   hooks: true,
  // })
  // lesson: Lesson[];
}
