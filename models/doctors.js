const {Model, DataTypes} = require('sequelize');
const connection = require('../db/connection');
const WorkingTimes = require('./working_times');

class doctors extends Model {

    static associate() {

    }

    static async findDoctorByEmail(email) {
        return this.findOne({
            where: {email}
        });
    }

}

doctors.init({
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    position: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    sequelize: connection,
    modelName: 'doctors',
    tableName: 'doctors'
});

doctors.hasMany(WorkingTimes, {foreignKey: 'doctorId'});

module.exports = doctors;
