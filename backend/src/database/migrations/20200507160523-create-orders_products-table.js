'use strict';
const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {

    /** @param {QueryInterface} queryInterface * @param {DataTypes} Sequelize */
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('orders_products', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            order_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                //references: { model: 'orders', key: 'id' },
            },

            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                //references: { model: 'products', key: 'id' },
            },

            quantity_buyed: {
                type: Sequelize.INTEGER,
                //allowNull: false
            },

            product_price: {
                type: Sequelize.DECIMAL,
                //allowNull: false
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

        return queryInterface.dropTable('orders_products');
    }
};