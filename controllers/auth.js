const {validationResult} = require('express-validator');
const AuthService = require('../services/auth');
const ApiError = require('../libs/errors/apiError');
const httpStatusCode = require('../libs/constants/http-Status-Codes');


async function register(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return next(ApiError.BadRequestError('validation error', errors.array()));
        }

        const {full_name, email, password, position, working_day, start, end} = req.body;
        await AuthService.register(full_name, email, password, position, working_day, start, end);

        res.status(httpStatusCode.CREATED).json({
            message: 'registration seccess'
        });
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const {email, password} = req.body;
        const doctor = await AuthService.login(email, password);
        res.status(httpStatusCode.OK).json({...doctor});
    } catch (err) {
        next(err);
    }
}


module.exports = {
    register,
    login
};