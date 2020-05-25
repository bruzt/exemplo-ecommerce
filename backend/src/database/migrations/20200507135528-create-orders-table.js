'use strict';
const Sequelize = require('sequelize');

module.exports = {

    /** @param {Sequelize.QueryInterface} queryInterface * @param {Sequelize.DataTypes} Sequelize */
    up: (queryInterface, Sequelize) => {
        
        return queryInterface.createTable('orders', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
            },

            address_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'addresses', key: 'id' },
            },

            freight_name: {
                type: Sequelize.STRING,
            },

            freight_price: {
                type: Sequelize.DECIMAL,
            },

            total_price: {
                type: Sequelize.DECIMAL,
            },

            status: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'awaiting payment',
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    /** @param {Sequelize.QueryInterface} queryInterface * @param {Sequelize.DataTypes} Sequelize */
    down: (queryInterface, Sequelize) => {
        
        return queryInterface.dropTable('orders');
    }
};