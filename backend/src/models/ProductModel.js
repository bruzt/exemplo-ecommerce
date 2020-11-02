const { Model, DataTypes } = require('sequelize');

const calcFinalPrice = require('../util/calcFinalPrice');

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
            
            finalPrice: DataTypes.VIRTUAL,

        }, {
            tableName: 'products',
            hooks: {
                afterFind(product){

                    if(product) {
                        if(Array.isArray(product)){
    
                            for(const prod of product){
                                prod.finalPrice = calcFinalPrice(prod.price, prod.discount_percent);
                            }
                        } else {
                            product.finalPrice = calcFinalPrice(product.price, product.discount_percent);
                        }
                    }
                }
            },
            sequelize: connection,
            paranoid: true,
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