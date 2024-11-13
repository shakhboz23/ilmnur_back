import { User } from '../../user/models/user.models';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Course } from '../../course/models/course.models';

interface SubscriptionsAttributes {
  course_id: number;
  user_id: number;
  is_active: SubscribeActive;
}

export enum SubscribeActive {
  // not_found = 'not_found',
  requested = 'requested',
  active = 'active',
  pending = 'pending',
}

@Table({ tableName: 'subscriptions' })
export class Subscriptions extends Model<Subscriptions, SubscriptionsAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  course_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @BelongsTo(() => Course)
  course: Course[];

  @BelongsTo(() => User)
  user: User[];
  
  @Column(
    DataType.ENUM({
      values: Object.keys(SubscribeActive),
    }),
  )
  is_active: SubscribeActive;
}
