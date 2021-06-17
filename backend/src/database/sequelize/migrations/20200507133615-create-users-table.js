'use strict';
const Sequelize = require('sequelize');

module.exports = {

    /** @param {Sequelize.QueryInterface} queryInterface * @param {Sequelize.DataTypes} Sequelize */
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false
            },

            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },

            cpf: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },

            password: {
                type: Sequelize.STRING,
                allowNull: false
            },

            admin: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },

            reset_password_token: {
                type: Sequelize.STRING,
            },

            reset_password_expires: {
                type: Sequelize.DATE,
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },

            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true,
            }
        });
    },

    /** @param {Sequelize.QueryInterface} queryInterface * @param {Sequelize.DataTypes} Sequelize */
    down: (queryInterface, Sequelize) => {

        return queryInterface.dropTable('users');
    }
};
