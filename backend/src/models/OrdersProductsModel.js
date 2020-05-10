const { Model, DataTypes } = require('sequelize');

class OrdersProductsModel extends Model {

    static init(connection){

        super.init({

            quantity_buyed: DataTypes.INTEGER,
            product_price: DataTypes.DECIMAL

        }, {
            tableName: 'orders_products',
            modelName: 'orders_products',
            sequelize: connection
        });
    }
}

module.exports = OrdersProductsModel;