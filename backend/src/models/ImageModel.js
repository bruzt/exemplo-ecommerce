const { Model, DataTypes } = require('sequelize');
const { unlink } = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(unlink);

class ImageModel extends Model {

    static init(connection){

        super.init({

            url: DataTypes.STRING,

        }, {
            tableName: 'images',
            sequelize: connection,
            hooks: {
                beforeDestroy: async (image) => {

                    if(process.env.IMG_STORAGE_LOCATION == 'local'){

                        await unlinkAsync(image.url);
                    }
                }
            }
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