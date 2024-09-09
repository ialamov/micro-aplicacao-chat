'use strict';

import { DataTypes } from "sequelize";

export async function up(queryInterface: any) {
  return queryInterface.context.createTable('rooms', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    userOne: {
      type: DataTypes.UUID,
      allowNull: false,
      reference: {
        model: {
          tableName: 'users'
        },
        key: 'id'
      }
    },
    userTwo: {
      type: DataTypes.UUID,
      allowNull: false,
      reference: {
        model: {
          tableName: 'users'
        },
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    }
  });
}

export async function down(queryInterface: any) {
  return queryInterface.context.dropTable('rooms');
}