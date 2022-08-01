const Users = require('../models/users');
const Registrations = require('../models/registrations');
const ApiError = require('../libs/errors/apiError');

class RegistrationService {
    static async registration(doctorId, date, name, surname, email) {
        const check = await Registrations.findOne({
            where: {
                doctorId: doctorId, date: date
            }
        });
        if (check) {
            throw  ApiError.BadRequestError(`Doctor with id : ${doctorId}  busy at that time`);
        }
        const candidate = await Users.findUserByEmail(email);
        if (candidate) {
            const already_exists = await Registrations.findOne({
                where: {
                    doctorId, userId: candidate.dataValues.id
                }
            });

            if (already_exists) {
                throw  ApiError.BadRequestError(`You are already registered with this doctor`);
            }

            return Registrations.create({doctorId, userId: candidate.dataValues.id, date});
        }
        const user = await Users.create({name, surname, email});
        return Registrations.create({doctorId, userId: user.dataValues.id, date});
    }
}

module.exports = RegistrationService;