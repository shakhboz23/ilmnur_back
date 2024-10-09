import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Lesson } from 'src/lesson/models/lesson.models';
import { Tests } from 'src/test/models/test.models';

interface Test_settingsAttributes {
  start_date: Date;
  end_date: Date;
  sort_level: number;
  test_count: number;
  lesson_id: number;
  period: number;
}

@Table({ tableName: 'test_settings' })
export class Test_settings extends Model<
  Test_settings,
  Test_settingsAttributes
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.DATE,
  })
  start_date: Date;

  @Column({
    type: DataType.DATE,
  })
  end_date: Date;

  @Column({
    type: DataType.INTEGER,
  })
  sort_level: number;

  @Column({
    type: DataType.INTEGER,
  })
  test_count: number;

  @Column({
    type: DataType.INTEGER,
  })
  period: number;

  @ForeignKey(() => Lesson)
  @Column({
    type: DataType.INTEGER,
    unique: true,
  })
  lesson_id: number;

  @BelongsTo(() => Lesson)
  lesson: Lesson;
}
