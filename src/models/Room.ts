import {
  Table,
  Model,
  AllowNull,
  Unique,
  PrimaryKey,
  BeforeCreate,
  Column,
  BelongsTo,
  NotNull,
  Scopes,
} from 'sequelize-typescript';
import { DataTypes, UUIDV4, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize';
import { User } from './User';


@Table({
  tableName: 'rooms',
  timestamps: true,
})
@Scopes(() => ({
  ['selected']: {
      attributes: ['id', 'userOneId', 'userTwoId']
  },
}))

export class Room extends Model<InferAttributes<Room>, InferCreationAttributes<Room>> {
  @PrimaryKey
  @Unique(true)
  @AllowNull(false)
  @Column({
      type: DataTypes.UUIDV4,
      defaultValue: UUIDV4,
      primaryKey: true,
  })
  declare id: CreationOptional<string>

  @AllowNull(false)
  @Column({
    type: DataTypes.UUID,
    field: 'userOne'
  })
  declare userOneId: string

  @AllowNull(false)
  @Column({
    type: DataTypes.UUID,
    field: 'userTwo'
  })
  declare userTwoId: string

  @BelongsTo(() => User, 'userOneId')
  declare userOne: NonAttribute<User>

  @BelongsTo(() => User, 'userTwoId')
  declare userTwo: NonAttribute<User>
}