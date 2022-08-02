const DoctorService = require('../services/doctor');
const httpStatusCodes = require('../libs/constants/http-Status-Codes');
const jwt = require('../libs/jwt');


async function getRegisteredUsers(req, res) {
    try {
        const {authorization} = req.headers;
        const doctorId = jwt.decodeToken(authorization.split(' ')[1]);
        const RegisteredUsers = await DoctorService.getRegisteredUsers(doctorId.id);

        res.status(httpStatusCodes.OK).send(RegisteredUsers);
    } catch (err) {
        res.status(httpStatusCodes.SERVER_ERROR).send(err.message);
    }
}

async function getAllDoctors(req, res) {
    try {
        const Doctors = await DoctorService.getAllDoctors();
        res.status(httpStatusCodes.OK).send(Doctors);
    } catch (err) {
        res.status(httpStatusCodes.SERVER_ERROR).send(err.message);
    }
}

async function addNewWorkingDay(req, res) {
    try {
        const {working_day, start, end} = req.body;
        const {authorization} = req.headers;

        const doctorId = jwt.decodeToken(authorization.split(' ')[1]);
        await DoctorService.addNewWorkingDay(working_day, start, end, doctorId.id);

        res.status(httpStatusCodes.OK).send('working day created');
    } catch (err) {
        res.status(httpStatusCodes.SERVER_ERROR).send(err.message);
    }
}


module.exports = {
    getRegisteredUsers,
    getAllDoctors,
    addNewWorkingDay
};