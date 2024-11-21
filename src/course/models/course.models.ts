import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Group } from '../../group/models/group.models';
import { Lesson } from '../../lesson/models/lesson.models';
import { Subscriptions } from 'src/subscriptions/models/subscriptions.models';
import { Category } from 'src/category/models/category.models';

interface CourseAttributes {
  title: string;
  description: string;
  price: number;
  discount: number;
  cover: string;
  group_id: number;
  category_id: number;
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

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;

  @BelongsTo(() => Category)
  category: Category[];

  @HasMany(() => Lesson)
  lessons: Lesson[];

  @HasMany(() => Subscriptions, {
    onDelete: 'CASCADE',
    hooks: true,
  })
  subscriptions: Subscriptions[];

  // @BelongsToMany(() => User, {
  // through: { model: () => Subscriptions }, // Use a function to specify the model type
  // foreignKey: 'course_id'
  // })
  // users: User[];
}
