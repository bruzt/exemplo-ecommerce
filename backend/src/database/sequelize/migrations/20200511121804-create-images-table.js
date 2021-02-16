'use strict';
const Sequelize = require('sequelize');

module.exports = {

    /** @param {Sequelize.QueryInterface} queryInterface * @param {Sequelize.DataTypes} Sequelize */
    up: (queryInterface, Sequelize) => {
        
        return queryInterface.createTable('images', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { 
                    model: 'products', 
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            url: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            filename: {
                type: Sequelize.STRING,
                allowNull: false,
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

        return queryInterface.dropTable('images');
    }
};