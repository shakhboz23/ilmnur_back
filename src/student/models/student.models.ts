import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface StudentAttributes {
  full_name: string;
  phone: string;
  role: string;
  subject: string;
}

export enum GenderType {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

@Table({ tableName: 'student' })
export class Student extends Model<Student, StudentAttributes> {
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
  full_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  class: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

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
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;
}
