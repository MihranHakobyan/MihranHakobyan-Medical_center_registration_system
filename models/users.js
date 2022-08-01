const {Model, DataTypes} = require('sequelize');
const connection = require('../db/connection');


class users extends Model {

    static associate() {

    }

    static async findUserByEmail(email) {
        return this.findOne({
            where: {email}
        });
    }

}

users.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING
}, {
    sequelize: connection,
    modelName: 'users',
    tableName: 'users'
});

module.exports = users;