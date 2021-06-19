'use strict';
const Sequelize = require('sequelize');

module.exports = {

    /** @param {Sequelize.QueryInterface} queryInterface * @param {Sequelize.DataTypes} Sequelize */
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('addresses', {

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
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            street: {
                type: Sequelize.STRING,
                allowNull: false
            },

            number: {
                type: Sequelize.STRING,
                allowNull: false
            },

            neighborhood: {
                type: Sequelize.STRING
            },

            city: {
                type: Sequelize.STRING,
                allowNull: false
            },

            state: {
                type: Sequelize.STRING,
                allowNull: false
            },

            zipcode: {
                type: Sequelize.STRING,
                allowNull: false
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },

            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true,
            }
        });
    },

    /** @param {Sequelize.QueryInterface} queryInterface * @param {Sequelize.DataTypes} Sequelize */
    down: (queryInterface, Sequelize) => {
        
        return queryInterface.dropTable('addresses');
    }
};