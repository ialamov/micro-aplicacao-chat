'use strict';

import { DataTypes } from "sequelize";

export async function up(queryInterface: any) {
  return queryInterface.context.createTable('messages', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    idRoom: {
      type: DataTypes.UUID,
      references: {
        model: 'rooms',
        key: 'id'
      }
    },
    message: {
      type: DataTypes.STRING
    },
    sender: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    }
  });
}
  
export async function down(queryInterface: any) {
  return queryInterface.context.dropTable('messages');
}