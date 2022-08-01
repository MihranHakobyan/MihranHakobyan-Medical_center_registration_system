const mailer = require('../libs/email');
const Registration = require('../models/registrations');
const Users = require('../models/users');

async function reminderToTheUser() {
    const registrations = await Registration.findAll(
        {
            attributes: ['date'],
            include: Users
        }
    );
    for (let i = 0; i <= registrations.lenghth; i++) {
        const date = registrations[i].dataValues.date;
        const email = registrations[i].dataValues.users[0].dataValues.email;
        if (Math.ceil(Math.abs(date - new Date()) / (1000 * 60 * 60 * 24)) <= 1 && date > new Date()) {
            mailer.mailOptions.to = email;
            mailer.mailOptions.text = `reminder. tomorrow is your registration day`;
            await mailer.transporter.sendMail(mailer.mailOptions);
        }
    }

}

module.exports = reminderToTheUser;