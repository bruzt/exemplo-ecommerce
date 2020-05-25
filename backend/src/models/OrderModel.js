const { Model, DataTypes } = require('sequelize');

const OrdersProducts = require('./OrdersProductsModel');

class OrderModel extends Model {

    static init(connection){

        super.init({

            freight_name: DataTypes.STRING,
            freight_price: DataTypes.DECIMAL,
            total_price: DataTypes.DECIMAL,
            status: DataTypes.STRING

        }, {
            tableName: 'orders',
            sequelize: connection
        });
    }

    static associate(models){

        this.belongsTo(models.UserModel, {
            foreignKey: 'user_id',
            as: 'users'
        });

        this.belongsTo(models.AddressModel, {
            foreignKey: 'address_id',
            as: 'address'
        });

        this.belongsToMany(models.ProductModel, {
            through: OrdersProducts,
            foreignKey: 'order_id',
            as: 'products'
        });
    }
}

module.exports = OrderModel;