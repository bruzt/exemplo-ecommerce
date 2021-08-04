const { Model, DataTypes } = require('sequelize');

class OrdersProductsModel extends Model {

    static init(connection){

        super.init({

            order_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
            quantity_buyed: DataTypes.INTEGER,
            product_price: DataTypes.DECIMAL,
            product_discount_percent: DataTypes.DECIMAL,

        }, {
            tableName: 'orders_products',
            modelName: 'orders_products',
            sequelize: connection
        });
    }
}

module.exports = OrdersProductsModel;