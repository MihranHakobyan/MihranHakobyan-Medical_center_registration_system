const express = require('express');
const RegistrationController = require('../controllers/RegistrationController');

const router = express.Router();

router.post('/', RegistrationController.registration);


module.exports = router;