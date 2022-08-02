'use strict';
const {Model, DataTypes} = require('sequelize');
const connection = require('../db/connection');

class working_times extends Model {
    static associate(models) {

    }
}

working_times.init({
    doctorId: DataTypes.INTEGER,
    working_day: DataTypes.DATEONLY,
    start: DataTypes.TIME,
    end: DataTypes.TIME
}, {
    sequelize: connection,
    modelName: 'working_times',
    tableName: 'working_times'
});


module.exports = working_times;