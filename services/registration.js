const Users = require('../models/users');
const WorkingTimes = require('../models/working_times');
const Registrations = require('../models/registrations');
const ApiError = require('../libs/errors/apiError');


async function registration(doctorId, date, name, surname, email) {

    const check = await Registrations.findOne({
        where: {
            doctorId: doctorId, date: date
        }
    });
    if (check) {
        throw  ApiError.BadRequestError(`Doctor with id : ${doctorId}  busy at that time`);
    }

    const working_day = await WorkingTimes.findAll({where: {doctorId}});
    let result = true;

    for (let i = 0; i < working_day.length; i++) {
        const work_date = working_day[i].dataValues;
        let {start, end} = work_date;
        const time = new Date(date).getHours();
        start = Number(start.toString()[0] + start.toString()[1]);
        end = Number(end.toString()[0] + end.toString()[1]);
        if (Math.floor(Math.abs(work_date.working_day - new Date(date)) / (1000 * 60 * 60 * 24)) == 0 && start <= time && time <= end) {
            result = false;
            break;
        }
    }

    if (result) {
        throw  ApiError.BadRequestError(`you have selected a non-working time`);
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


module.exports = registration;