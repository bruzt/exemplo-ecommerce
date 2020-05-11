const { Model, DataTypes } = require('sequelize');

class ImageModel extends Model {

    static init(connection){

        super.init({

            url: DataTypes.STRING,

        }, {
            tableName: 'images',
            sequelize: connection
        });
    }

    static associate(models){

        this.belongsTo(models.ProductModel, {
            foreignKey: 'product_id',
            as: 'product'
        });
    }
}

module.exports = ImageModel;