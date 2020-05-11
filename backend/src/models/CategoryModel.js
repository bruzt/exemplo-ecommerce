const { Model, DataTypes } = require('sequelize');

class CategoryModel extends Model {

    static init(connection){

        super.init({

            name: DataTypes.STRING,
            parent: DataTypes.INTEGER,

        }, {
            tableName: 'categories',
            sequelize: connection
        });
    }

    static associate(models){

        this.hasMany(models.ProductModel, {
            foreignKey: 'category_id',
            as: 'products'
        });
    }
}

module.exports = CategoryModel;