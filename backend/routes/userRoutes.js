const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/signup', userController.register_user);
router.post('/login', userController.login_validation, userController.login);
router.get('/users', authMiddleware, userController.userdata);
router.get('/search', authMiddleware, userController.searchuser);
router.get('/user_based_on_id', authMiddleware, userController.userdata_based_on_id);




module.exports = router;