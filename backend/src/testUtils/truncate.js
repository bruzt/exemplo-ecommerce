
const sequelize = require('../database/sequelize/connection');

module.exports = () => {

    if(process.env.NODE_ENV === 'test'){

        return Promise.all(Object.keys(sequelize.models).map( async (key) => {
            
            return [
                //sequelize.models[key].truncate({ cascade: true, restartIdentity: true }),
                sequelize.models[key].destroy({ truncate: true, force: true }),
                sequelize.query(`DELETE FROM sqlite_sequence WHERE name = '${sequelize.models[key].tableName}'`)
            ]
        }));
    }
}