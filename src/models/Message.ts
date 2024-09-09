import {
  Table,
  Model,
  AllowNull,
  Unique,
  PrimaryKey,
  BeforeCreate,
  Column,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes, UUIDV4, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize';
import { User } from './User';
import { Room } from './Room';


@Table({
  tableName: 'messages',
  timestamps: true,
})


export class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
  @PrimaryKey
  @Unique(true)
  @AllowNull(false)
  @Column({
      type: DataTypes.UUIDV4,
      defaultValue: UUIDV4,
      primaryKey: true,
  })
  declare id: CreationOptional<string>;
  
  @AllowNull(false)
  @Column({
      type: DataTypes.STRING,
  })
  declare message: string;
  
  @AllowNull(false)
  @Column({
    type: DataTypes.UUID,
    field: 'sender', 
  })
  declare userId: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.UUID,
    field: 'idRoom',
  })
  declare roomId: string;

  @BelongsTo(() => Room, 'roomId') 
  declare room: NonAttribute<Room>;

  @BelongsTo(() => User, 'userId')
  declare user: NonAttribute<User>;
}