const Sequelize = require('sequelize');

const autoRequireAll = require('../../util/autoRequireAll');
const databaseConfig = require('../../config/databaseConfig');

const models = autoRequireAll(__dirname, '../../models');

const connection = new Sequelize(databaseConfig);

for (let model in models) {
    models[model].init(connection);
}

for (let model in models) {
    if (models[model].associate) {
        models[model].associate(connection.models);
    }
}

module.exports = connection;