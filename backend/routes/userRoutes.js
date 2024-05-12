const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");


router.post('/signup', userController.register_user);
router.post('/login', userController.login_validation, userController.login);



module.exports = router;