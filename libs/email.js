const nodemailer = require('nodemailer');
const configs = require('../config/configs');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:  configs.EMAIL,
        pass: configs.EMAIL_PASSWORD
    }
});

const mailOptions = {
    from: configs.EMAIL,
    subject: 'Medical Center Online Register System',

};


module.exports={transporter,mailOptions}


