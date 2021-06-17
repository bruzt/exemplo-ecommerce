'use strict';
const Sequelize = require('sequelize');

module.exports = {

    /** @param {Sequelize.QueryInterface} queryInterface * @param {Sequelize.DataTypes} Sequelize */
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
                references: { model: 'orders', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'products', key: 'id' },
                onUpdate: 'CASCADE',
            },

            quantity_buyed: {
                type: Sequelize.INTEGER,
                //allowNull: false
            },

            product_price: {
                type: Sequelize.DECIMAL,
                //allowNull: false
            },

            product_discount_percent: {
                type: Sequelize.DECIMAL,
                defaultValue: 0,
                //allowNull: false
            },

            created_at: {
                type: Sequelize.DATE,
            },

            updated_at: {
                type: Sequelize.DATE,
            }
        });

    },

    /** @param {Sequelize.QueryInterface} queryInterface * @param {Sequelize.DataTypes} Sequelize */
    down: (queryInterface, Sequelize) => {

        return queryInterface.dropTable('orders_products');
    }
};