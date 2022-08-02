const express = require('express');
const {body} = require('express-validator');
const AuthController = require('../controllers/auth');

const router = express.Router();

router.post('/sign-in', body('full_name').isString(), body('email').isEmail(), body('password').isLength({
    min: 4,
    max: 20
}), body('position').isString(), AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;