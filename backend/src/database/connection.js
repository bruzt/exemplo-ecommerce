const Sequelize = require('sequelize');

const autoRequireAll = require('../util/autoRequireAll');
const config = require('./config');

const models = autoRequireAll(__dirname, '../models');

const connection = new Sequelize(config);

for (let model in models) {
    models[model].init(connection);
}

for (let model in models) {
    if (models[model].associate) {
        models[model].associate(connection.models);
    }
}

// Add a permanent global hook to prevent unknowingly hitting this Sequelize bug:
// https://github.com/sequelize/sequelize/issues/9481
connection.addHook('beforeCount', function (options) {
    if (this._scope.include && this._scope.include.length > 0) {
        options.distinct = true
        options.col = this._scope.col || options.col || `"${this.options.name.singular}".id`
    }

    if (options.include && options.include.length > 0) {
        options.include = null
    }
})

module.exports = connection;