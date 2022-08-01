const bcrypt = require('bcrypt');
const Doctor = require('../models/doctors');
const DoctorDto = require('../dtos/doctorDto');
const jwt = require('../libs/jwt');
const ApiError = require('../libs/errors/apiError');

class AuthService {
    static async register(full_name, email,password,position) {
        const candidate = await Doctor.findDoctorByEmail(email);
        if (candidate) {
            throw  ApiError.BadRequestError(`Doctor with ${email} address already excist`);
        }
        const heshPassword = await bcrypt.hash(password, 5);
        await Doctor.create({full_name, email,password:heshPassword,position});
    }

    static async login(email, password) {

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
}

module.exports = AuthService;