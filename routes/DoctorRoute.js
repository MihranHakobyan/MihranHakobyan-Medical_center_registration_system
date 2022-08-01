const express = require('express');
const DoctorController = require('../controllers/DoctorController');
const authorize = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.get('/',authorize,DoctorController.getRegisteredUsers)
router.get('/all',DoctorController.getAllDoctors)

module.exports = router;