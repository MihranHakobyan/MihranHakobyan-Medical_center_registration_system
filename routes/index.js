const express = require('express');

const AuthRoute = require('./auth');
const DoctorRoute = require('./doctor');
const RegistrationRoute = require('./registration');

const router = express.Router();


router.use('/auth', AuthRoute);
router.use('/doc', DoctorRoute);
router.use('/registration', RegistrationRoute);
module.exports = router;