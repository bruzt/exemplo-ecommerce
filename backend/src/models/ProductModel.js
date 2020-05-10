const { Model, DataTypes } = require('sequelize');

class ProductModel extends Model {

    static init(connection){

        super.init({

            name: DataTypes.STRING,
            description: DataTypes.STRING,
            price: DataTypes.DECIMAL,
            quantity: DataTypes.INTEGER,
            category: DataTypes.STRING,
            discount_percent: DataTypes.DECIMAL

        }, {
            tableName: 'products',
            sequelize: connection
        });
    }

    static associate(models){

        this.belongsToMany(models.OrderModel, {
            through: 'orders_products',
            foreignKey: 'product_id',
            as: 'orders'
        });
    }
}

module.exports = ProductModel;