'use strict';
const { QueryInterface, DataTypes } = require('sequelize');

module.exports = {

    /** @param {QueryInterface} queryInterface * @param {DataTypes} Sequelize */
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

            district: {
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

            created_at:{
                type: Sequelize.DATE,
                allowNull: false
            },

            updated_at:{
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    /** @param {QueryInterface} queryInterface * @param {DataTypes} Sequelize */
    down: (queryInterface, Sequelize) => {
        
        return queryInterface.dropTable('addresses');
    }
};