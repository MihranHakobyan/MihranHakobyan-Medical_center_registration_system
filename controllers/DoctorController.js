const DoctorService = require('../services/DoctorService');
const httpStatusCodes = require('../libs/constants/http-Status-Codes');
const jwt = require('../libs/jwt');

class DoctorController {
    static async getRegisteredUsers(req, res) {
        try {
            const {authorization} = req.headers;
            const doctorId = jwt.decodeToken(authorization.split(' ')[1]);
            const RegisteredUsers = await DoctorService.getRegisteredUsers(doctorId.id);
            res.status(httpStatusCodes.OK).send(RegisteredUsers);
        } catch (err) {
            res.status(httpStatusCodes.SERVER_ERROR).send(err.message);
        }
    }
    static async getAllDoctors(req,res){
        try{
            const Doctors=await DoctorService.getAllDoctors()
            res.status(httpStatusCodes.OK).send(Doctors)
        }catch (err){
            res.status(httpStatusCodes.SERVER_ERROR).send(err.message);
        }
    }
}

module.exports = DoctorController;