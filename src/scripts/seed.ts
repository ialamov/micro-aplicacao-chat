import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from './../libs/Database';

const umzug = new Umzug({
    migrations: {
        glob: './src/seeders/*.ts',
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

export type Migration = typeof umzug._types.migration;

(async () => {
    const seeders = (await umzug.pending()).length;
    console.info(`There is a total of ${seeders} pending seeders to run.`);
    await umzug.up();
})();
