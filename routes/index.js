const express = require('express');

const AuthRoute = require('./AuthRoute');
const DoctorRoute = require('./DoctorRoute');
const RegistrationRoute=require('./RegistrationRoute')

const router = express.Router();


router.use('/auth', AuthRoute);
router.use('/doc', DoctorRoute);
router.use('/registration',RegistrationRoute)
module.exports = router;