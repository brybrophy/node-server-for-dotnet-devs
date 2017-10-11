const chalk = require('chalk');
const PostgressConnectionStringParser = require('pg-connection-string');
const connectionOptions = PostgressConnectionStringParser.parse(process.env.DATABASE_URL);
const env = process.env.NODE_ENV;

const configs = {
    development: {
        type: 'postgres',
        host: connectionOptions.host,
        port: connectionOptions.port,
        database: connectionOptions.database,
        synchronize: true,
        logging: false,
        entities: ['src/domain/entities/**/*.ts'],
        migrations: ['src/db/migrations/**/*.ts'],
        cli: {
            migrationsDir: 'src/db/migrations/'
        }
    },
    test: {
        type: 'postgres',
        host: connectionOptions.host,
        port: connectionOptions.port,
        database: `${connectionOptions.database}_test`,
        synchronize: true,
        logging: false,
        entities: ['src/domain/entities/**/*.ts'],
        migrations: ['src/db/migrations/**/*.ts'],
        cli: {
            migrationsDir: 'src/db/migrations/'
        }
    },
    production: {
        type: 'postgres',
        host: connectionOptions.host,
        port: connectionOptions.port,
        database: connectionOptions.database,
        username: connectionOptions.user,
        password: connectionOptions.password,
        entities: ['dist/domain/entities/**/*.js'],
        migrations: ['dist/db/migrations/**/*.js'],
        cli: {
            migrationsDir: 'dist/db/migrations/'
        }
    }
};

console.log(`----------------->Running the ORM with the ${chalk.bold.cyan(env)} config`);
module.exports = configs[env];
