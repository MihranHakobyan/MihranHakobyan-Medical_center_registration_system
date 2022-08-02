const bcrypt = require('bcrypt');
const Doctor = require('../models/doctors');
const WorkingTimes = require('../models/working_times');
const DoctorDto = require('../dtos/doctor');
const jwt = require('../libs/jwt');
const ApiError = require('../libs/errors/apiError');


async function register(full_name, email, password, position, working_day, start, end) {
    const candidate = await Doctor.findDoctorByEmail(email);
    if (candidate) {
        throw  ApiError.BadRequestError(`Doctor with ${email} address already excist`);
    }
    const heshPassword = await bcrypt.hash(password, 5);
    const doctor = await Doctor.create({full_name, email, password: heshPassword, position});
    await WorkingTimes.create({working_day, start, end, doctorId: doctor.dataValues.id});
}

async function login(email, password) {

    const doctor = await Doctor.findDoctorByEmail(email);
    if (!doctor) {
        throw ApiError.BadRequestError(`user with this email ${email} not found`);
    }

    const isPasswordEquals = await bcrypt.compare(password, doctor.password);
    if (!isPasswordEquals) {
        throw ApiError.BadRequestError('Wrong password');
    }

    const doctorDto = new DoctorDto(doctor.dataValues);
    const token = jwt.generateToken(doctorDto);

    return {
        ...token, doctor: doctorDto
    };
}


module.exports = {
    register, login
};