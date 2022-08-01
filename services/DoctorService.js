const Registration = require('../models/registrations');
const Doctors = require('../models/doctors');
const Users=require('../models/users')
class DoctorService {
    static async getRegisteredUsers(doctorId) {
        return Registration.findAll(
            {
                where: {
                    doctorId
                },
                include:Users
            }
        );
    }

    static async getAllDoctors() {
        return Doctors.findAll();
    }
}

module.exports = DoctorService;