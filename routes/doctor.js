const express = require('express');
const DoctorController = require('../controllers/doctor');
const authorize = require('../middlewares/auth');

const router = express.Router();

router.get('/', authorize, DoctorController.getRegisteredUsers);
router.post('/add', authorize, DoctorController.addNewWorkingDay);
router.get('/all', DoctorController.getAllDoctors);

module.exports = router;