const dotenv = require('dotenv');

let env;
if(process.env.NODE_ENV === 'production') env = '.env';
else if(process.env.NODE_ENV === 'test') env = '.env.test';
else env = '.env.dev';

dotenv.config({
    path: env
});

/////////////////////////////

const path = require('path');

const {
    DB_DIALECT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_DATABASE
} = process.env;

const dbUrl = `${DB_DIALECT}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

let ormconfig;

if(process.env.NODE_ENV === 'production'){

    ormconfig = {
        type: DB_DIALECT,
        url: dbUrl,
        entities: [path.join('build', 'src', 'models', '*.js')],
        migrations: [path.join('build', 'src', 'databases', 'typeorm', 'migrations', '*.js')],
        cli: {
            migrationsDir: path.join('build', 'src', 'databases', 'typeorm', 'migrations')
        }
    }
} else {
    
    ormconfig = {
        type: DB_DIALECT,
        url: dbUrl,
        entities: [path.join('src', 'models', '*.ts')],
        migrations: [path.join('src', 'databases', 'typeorm', 'migrations', '*.ts')],
        cli: {
            migrationsDir: path.join('src', 'databases', 'typeorm', 'migrations')
        },
        //logging: true
    }
}

module.exports = ormconfig;
