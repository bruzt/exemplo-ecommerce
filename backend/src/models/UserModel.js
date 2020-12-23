const { Model, DataTypes } = require('sequelize');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserModel extends Model {

    static init(connection) {

        super.init({

            name: DataTypes.STRING,
            email: DataTypes.STRING,
            cpf: DataTypes.STRING,
            password: DataTypes.STRING,
            admin: DataTypes.BOOLEAN,
            reset_password_token: DataTypes.STRING,
            reset_password_expires: DataTypes.DATE,

        }, {
            tableName: 'users',
            sequelize: connection,
            hooks: {
                beforeSave: async (user) => {
                    
                    if(user._changed.password){

                        user.password = await bcrypt.hash(user.password, 8);
                    }
                }
            }
        });
    }

    static associate(models) {

        this.hasMany(models.AddressModel, {
            foreignKey: 'user_id',
            as: 'addresses'
        });

        this.hasMany(models.OrderModel, {
            foreignKey: 'user_id',
            as: 'orders'
        });
    }

    checkPassword(password) {

        return bcrypt.compare(password, this.password);
    }

    generateToken() {

        return jwt.sign(
            { 
                id: this.id, 
                admin: this.admin
            }, 
            process.env.APP_SECRET, 
            {
                expiresIn: '12h'
            }
        );
    }
}

module.exports = UserModel;