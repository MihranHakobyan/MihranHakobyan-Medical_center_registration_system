'use strict';
const {Model,DataTypes} = require('sequelize');
const connection=require('../db/connection')
const Users=require('./users')
class registrations extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
registrations.init({
  date: DataTypes.DATE,
  userId:DataTypes.INTEGER,
  doctorId:DataTypes.INTEGER
}, {
  sequelize:connection,
  modelName: 'registrations',
  tableName:"registrations"
});
registrations.hasMany(Users,{foreignKey:'id'})
module.exports=registrations