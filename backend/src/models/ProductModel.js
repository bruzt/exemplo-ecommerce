const { Model, DataTypes } = require('sequelize');

const OrdersProducts = require('./OrdersProductsModel');

class ProductModel extends Model {

    static init(connection){

        super.init({

            title: DataTypes.STRING,
            description: DataTypes.STRING,
            html_body: DataTypes.TEXT,
            price: DataTypes.DECIMAL,
            quantity_stock: DataTypes.INTEGER,
            quantity_sold: DataTypes.INTEGER,
            discount_percent: DataTypes.DECIMAL,
            category_id: DataTypes.INTEGER,
            tangible: DataTypes.BOOLEAN,
            weight: DataTypes.STRING,
            length: DataTypes.DECIMAL,
            height: DataTypes.DECIMAL,
            width: DataTypes.DECIMAL,

        }, {
            tableName: 'products',
            sequelize: connection,
            paranoid: true
        });
    }

    static associate(models){

        this.belongsToMany(models.OrderModel, {
            through: OrdersProducts,
            foreignKey: 'product_id',
            as: 'orders'
        });

        this.belongsTo(models.CategoryModel, {
            foreignKey: 'category_id',
            as: 'category'
        });

        this.hasMany(models.ImageModel, {
            foreignKey: 'product_id',
            as: 'images'
        });
    }
}

module.exports = ProductModel;