const {validationResult} = require('express-validator');
const AuthService = require('../services/AuthService');
const ApiError = require('../libs/errors/apiError');
const httpStatusCode = require('../libs/constants/http-Status-Codes');

class AuthController {
    static async register(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequestError('validation error', errors.array()));
            }


            const {full_name, email,password,position} = req.body;
            await AuthService.register(full_name, email,password,position);
            res.status(httpStatusCode.CREATED).json({
                message: 'registration seccess'
            });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const doctor = await AuthService.login(email, password);
            res.status(httpStatusCode.OK).json({...doctor});
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AuthController;