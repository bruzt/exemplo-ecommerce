let envPath;

if(process.env.NODE_ENV == 'test') envPath = '.env.test';
else if(process.env.NODE_ENV == 'production') envPath = '.env';
else envPath = '.env.dev';

require('dotenv').config({
    path: envPath
});

/////////////////////////////////////

const Sequelize = require('sequelize');

const autoRequireAll = require('../../util/autoRequireAll');
const databaseConfig = require('../../config/databaseConfig');

const models = autoRequireAll(__dirname, '../../models');

const connection = new Sequelize(process.env.DATABASE_URL, databaseConfig);

for (let model in models) {
    models[model].init(connection);
}

for (let model in models) {
    if (models[model].associate) {
        models[model].associate(connection.models);
    }
}

module.exports = connection;
