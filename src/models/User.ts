import {
    Table,
    Column,
    Model,
    AllowNull,
    Unique,
    PrimaryKey,
    BeforeCreate,
    Scopes,
} from 'sequelize-typescript';
import { DataTypes, UUIDV4, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

import { hashPassword } from '../libs/helpers';
import { UserScopes } from '../enums/UserScopes';

@Scopes(() => ({
    [UserScopes.withoutPassword]: {
        attributes: ['id', 'name', 'email', 'phone']
    },
    [UserScopes.withEverything]: {
        // include: [
        //     {
        //         model: Conversation
        //     },
        // ],
    },
}))
@Table({
    tableName: 'users',
    timestamps: true,
    paranoid: true,
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
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
    @Unique
    @Column({
        type: DataTypes.STRING,
    })
    declare email: string;

    @AllowNull(false)
    @Column({
        type: DataTypes.STRING,
    })
    declare name: string;

    @AllowNull(false)
    @Column({
        type: DataTypes.STRING,
    })
    declare password: string;

    @AllowNull(false)
    @Unique
    @Column({
        type: DataTypes.STRING,
    })
    declare phone: string;

    @BeforeCreate
    static async hashPassword(instance: User) {
        instance.password = await hashPassword(instance.password);
    }
}
