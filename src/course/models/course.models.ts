import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Group } from 'src/group/models/group.models';
import { Lesson } from 'src/lesson/models/lesson.models';

interface CourseAttributes {
  title: string;
  description: string;
  price: number;
  discount: number;
  cover: string;
  group_id: number;
}

@Table({ tableName: 'course' })
export class Course extends Model<Course, CourseAttributes> {
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
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  discount: number;

  @Column({
    type: DataType.STRING,
  })
  cover: string;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
  })
  group_id: number;

  @BelongsTo(() => Group)
  group: Group[];

  @HasMany(() => Lesson)
  lessons: Lesson[];
}
