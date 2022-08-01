const Registration = require('../models/registrations');
const Doctors = require('../models/doctors');
const Users = require('../models/users');
const Working_times = require('../models/working_times');

class DoctorService {
    static async getRegisteredUsers(doctorId) {
        return Registration.findAll(
            {
                attributes: ['date'],
                where: {
                    doctorId
                },
                include: Users
            }
        );
    }

    static async getAllDoctors() {
        return Doctors.findAll({
            attributes: ['full_name','email'],
            include: Working_times
        });
    }
}

module.exports = DoctorService;