const {validationResult} = require('express-validator');
const RegistrationService = require('../services/RegistrationService');
const httpStatusCode = require('../libs/constants/http-Status-Codes');
const ApiError = require('../libs/errors/apiError');
const mailer=require('../libs/email')


class RegistrationController {
    static async registration(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequestError('validation error', errors.array()));
            }

            const {doctorId, date, name, surname, email} = req.body;
            await RegistrationService.registration(doctorId, date, name, surname, email);
            mailer.mailOptions.to=email
            mailer.mailOptions.text=`you have successfully registered on ${date}`
            await mailer.transporter.sendMail(mailer.mailOptions)

            res.status(httpStatusCode.CREATED).json({
                message: 'registration seccess'
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = RegistrationController;