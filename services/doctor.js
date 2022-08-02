const Registration = require('../models/registrations');
const Doctors = require('../models/doctors');
const Users = require('../models/users');
const WorkingTimes = require('../models/working_times');

async function getRegisteredUsers(doctorId) {
    return Registration.findAll({
        attributes: ['date'], where: {
            doctorId
        }, include: Users
    });
}

async function getAllDoctors() {
    return Doctors.findAll({
        attributes: ['full_name', 'email'],
        include: WorkingTimes
    });
}

async function addNewWorkingDay(working_day, start, end, doctorId) {
    await WorkingTimes.create({working_day, start, end, doctorId});
}


module.exports = {
    getRegisteredUsers, getAllDoctors, addNewWorkingDay
};