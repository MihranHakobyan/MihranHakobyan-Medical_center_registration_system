'use strict';
const {Model, DataTypes} = require('sequelize');
const connection = require('../db/connection');
const Users = require('./users');

class registrations extends Model {

    static associate(models) {

    }
}

registrations.init({
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER
}, {
    sequelize: connection,
    modelName: 'registrations',
    tableName: 'registrations'
});

registrations.hasMany(Users, {foreignKey: 'id'});

module.exports = registrations;