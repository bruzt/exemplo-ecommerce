const { Model, DataTypes } = require('sequelize');

const calcFinalPrice = require('../util/calcFinalPrice');
const isOnSale = require('../util/isOnSale');

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
            discount_datetime_start: DataTypes.DATE,
            discount_datetime_end: DataTypes.DATE,
            category_id: DataTypes.INTEGER,
            tangible: DataTypes.BOOLEAN,
            weight: DataTypes.STRING,
            length: DataTypes.DECIMAL,
            height: DataTypes.DECIMAL,
            width: DataTypes.DECIMAL,
            
            finalPrice: DataTypes.VIRTUAL,
            isOnSale: DataTypes.VIRTUAL,

        }, {
            tableName: 'products',
            hooks: {
                afterFind(product){

                    if(product) {
                        if(Array.isArray(product)){
                            for(const prod of product){

                                prod.price = String(Number(prod.price).toFixed(2));

                                prod.isOnSale = isOnSale(prod);

                                if(prod.isOnSale) prod.finalPrice = String(calcFinalPrice(prod.price, prod.discount_percent));
                                else prod.finalPrice = String(Number(prod.price).toFixed(2));
                            }
                        } else {

                            product.price = String(Number(product.price).toFixed(2));

                            product.isOnSale = isOnSale(product);

                            if(product.isOnSale) product.finalPrice = calcFinalPrice(product.price, product.discount_percent);
                            else product.finalPrice = String(Number(product.price).toFixed(2));
                        }
                    }
                }
            },
            sequelize: connection,
            paranoid: true,
        });
    }

    ///////////////////////////////////////

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
