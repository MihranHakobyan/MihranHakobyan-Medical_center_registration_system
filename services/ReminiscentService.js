const mailer=require('../libs/email')
const Registration = require('../models/registrations');
const Users = require('../models/users');

async function reminderToTheUser(){
    const registrations= await Registration.findAll(
        {
            attributes: ['date'],
            include: Users
        }
    );

    const date=registrations[0].dataValues.date
    const email=registrations[0].dataValues.users[0].dataValues.email;
    if(Math.ceil(Math.abs(date - new Date())/(1000*60*60*24)) <= 1 && date > new Date()){
        mailer.mailOptions.to = email;
        mailer.mailOptions.text = `reminder. tomorrow is your registration day`;
        await mailer.transporter.sendMail(mailer.mailOptions);
    }
}

module.exports=reminderToTheUser