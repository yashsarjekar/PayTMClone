const express = require('express');
const router = express.Router();
const accountController = require("../controllers/accountController");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/credit', authMiddleware, accountController.credit);
router.post('/debit', authMiddleware, accountController.debit);
router.post('/transferfund', authMiddleware, accountController.transferfunds);
router.get('/dashboard', authMiddleware, accountController.dashboard);
router.get('/transactions', authMiddleware, accountController.transaction_list);

module.exports = router;