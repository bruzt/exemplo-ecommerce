const { Model, DataTypes } = require('sequelize');

class AddressModel extends Model {

    static init(connection){

        super.init({

            street: DataTypes.STRING,
            number: DataTypes.INTEGER,
            district: DataTypes.STRING,
            city: DataTypes.STRING,
            state: DataTypes.STRING,
            zipcode: DataTypes.STRING,


        }, {
            tableName: 'addresses',
            sequelize: connection
        });
    }

    static associate(models){

        this.belongsTo(models.UserModel, {
            foreignKey: 'user_id',
            as: 'user'
        });

        this.hasMany(models.OrderModel, {
            foreignKey: 'address_id',
            as: 'orders'
        });
    }
}

module.exports = AddressModel;