const httpStatusCodes = require('../constants/http-Status-Codes');

class ApiError extends Error {
    statusCode;
    errors;

    constructor(statusCode, message, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(httpStatusCodes.UNAUTHORIZED, 'Doctor is not authorized');
    }
    static BadRequestError(message,errors=[]){
        return new ApiError(httpStatusCodes.BAD_REQUEST,message,errors)
    }
}

module.exports=ApiError