'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('registrations', 'userId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        await queryInterface.addColumn('registrations', 'doctorId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'doctors',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('registrations', 'userId');
        await queryInterface.removeColumn('registrations', 'doctorId');
    }
};
