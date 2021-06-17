'use strict';
const Sequelize = require('sequelize');

module.exports = {

    /** @param {Sequelize.QueryInterface} queryInterface * @param {Sequelize.DataTypes} Sequelize */
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('products', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            category_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'categories', key: 'id' }
            },  

            title: {
                type: Sequelize.STRING,
                allowNull: false
            },

            description: {
                type: Sequelize.STRING,
                allowNull: false
            },

            html_body: {
                type: Sequelize.TEXT,
                defaultValue: '<p>Em breve</p>'
            },

            price: {
                type: Sequelize.DECIMAL,
                allowNull: false
            },

            quantity_stock: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },  

            quantity_sold: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            }, 

            discount_percent: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },

            discount_datetime_start: {
                type: Sequelize.DATE,
                allowNull: true
            },

            discount_datetime_end: {
                type: Sequelize.DATE,
                allowNull: true
            },

            tangible: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },

            weight: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            length: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },

            height: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },

            width: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
            },

            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true,
            }
        });
    },

    /** @param {Sequelize.QueryInterface} queryInterface * @param {Sequelize.DataTypes} Sequelize */
    down: (queryInterface, Sequelize) => {

        return queryInterface.dropTable('products');
    }
};
