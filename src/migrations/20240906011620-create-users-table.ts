import { DataTypes } from 'sequelize';

export async function up(queryInterface: any) {
    return queryInterface.context.createTable('users', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
      },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now(),
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now(),
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
    });
}

export async function down(queryInterface: any) {
    return queryInterface.context.dropTable('users');
}
