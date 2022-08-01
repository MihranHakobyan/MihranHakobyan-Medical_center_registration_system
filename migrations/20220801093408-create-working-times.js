'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('working_times', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        foreignKey:true,
        references:{
          model:'doctors',
          key:'id'
        },
        onDelete:'cascade',
        onUpdate:'cascade'
      },
      working_day: {
        allowNull:false,
        type: Sequelize.DATE
      },
      start: {
        allowNull:false,
        type: Sequelize.TIME
      },
      end: {
        allowNull:false,
        type: Sequelize.TIME
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('working_times');
  }
};