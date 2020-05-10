const { Model, DataTypes } = require('sequelize');

const OrdersProducts = require('./OrdersProductsModel');

class OrderModel extends Model {

    static init(connection){

        super.init({

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
            through: { model: OrdersProducts },
            foreignKey: 'order_id',
            as: 'products'
        });
    }
}

module.exports = OrderModel;