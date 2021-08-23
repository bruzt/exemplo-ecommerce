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

let ormconfig;

if(process.env.NODE_ENV === 'production'){

    ormconfig = {
        type: process.env.DATABASE_DIALECT,
        url: process.env.DATABASE_URL,
        entities: [path.join('build', 'src', 'models', '*.js')],
        migrations: [path.join('build', 'src', 'databases', 'typeorm', 'migrations', '*.js')],
        seeds: [path.join('build', 'src', 'databases', 'typeorm', 'seeds', '*.js')],
        cli: {
            migrationsDir: path.join('build', 'src', 'databases', 'typeorm', 'migrations')
        }
    }
} else {
    
    ormconfig = {
        type: process.env.DATABASE_DIALECT,
        url: process.env.DATABASE_URL,
        entities: [path.join('src', 'models', '*.ts')],
        migrations: [path.join('src', 'databases', 'typeorm', 'migrations', '*.ts')],
        seeds: [path.join('src', 'databases', 'typeorm', 'seeds', 'dev', '*.ts')],
        cli: {
            migrationsDir: path.join('src', 'databases', 'typeorm', 'migrations')
        },
        //logging: true
    }
}

module.exports = ormconfig;
