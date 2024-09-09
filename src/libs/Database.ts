import * as pg from 'pg';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
import { Message } from '../models/Message';
import { Room } from '../models/Room';

dotenv.config();

export const sequelize = new Sequelize({
    dialect: 'postgres',
    dialectModule: pg,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432,
    logQueryParameters: false,
    logging: false,
    pool: {
        max: 25,
        min: 0,
        idle: 0,
        acquire: 3000,
        evict: 30000,
    },
    dialectOptions: {
        application_name: 'Douglas API',
        keepAlive: true,
        statement_timeout: 25000,
        idle_in_transaction_session_timeout: 30000,
    },
    models: [User, Room, Message],
});

export const loadSequelize = async (): Promise<Sequelize | Error> => {
    try {
        await sequelize.authenticate();
        return sequelize;
    } catch (error) {
        throw new Error('Failed to authenticate on Postgres database!');
    }
};
