let envPath;

if(process.env.NODE_ENV == 'test') envPath = '.env.test';
else if(process.env.NODE_ENV == 'production') envPath = '.env';
else envPath = '.env.dev';

require('dotenv').config({
    path: envPath
});

module.exports = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    storage: (process.env.NODE_ENV === 'test') ? './_tests/database.sqlite' : undefined,
    define: {
        timestamps: true,
        underscored: true, // snake_case
        //freezeTableName: true, // disable the modification of tablenames into plural
    },
    quoteIdentifiers: false, // torna nomes das tabelas e atributo case-insensitive
    logging: false, // disable logging queries; default: console.log
}