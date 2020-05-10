'use strict';
const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {

    /** @param {QueryInterface} queryInterface * @param {DataTypes} Sequelize */
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

    /** @param {QueryInterface} queryInterface * @param {DataTypes} Sequelize */
    down: (queryInterface, Sequelize) => {
        
        return queryInterface.dropTable('orders');
    }
};