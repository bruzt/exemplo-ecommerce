const Sequelize = require('sequelize');

const autoRequireAll = require('../util/autoRequireAll');
const config = require('./config');

const models = autoRequireAll(__dirname, '../models');

const connection = new Sequelize(config);

for(let model in models){
    models[model].init(connection);
}

for(let model in models){
    if(models[model].associate){
        models[model].associate(connection.models);
    }
}

module.exports = connection;