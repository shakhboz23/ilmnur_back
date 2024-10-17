import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Role } from '../../role/models/role.models';
import { Tests } from '../../test/models/test.models';

interface ReytingAttributes {
  role_id: number;
  ball: number;
  test_id: number;
}

@Table({ tableName: 'reyting' })
export class Reyting extends Model<Reyting, ReytingAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  ball: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  role_id: number;

  @BelongsTo(() => Role)
  role: Role[];

  @ForeignKey(() => Tests)
  @Column({
    type: DataType.INTEGER,
  })
  test_id: number;

  @BelongsTo(() => Tests)
  test: Tests[];
}
