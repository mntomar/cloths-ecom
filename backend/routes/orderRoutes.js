const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

router.post('/create', auth, orderController.placeOrder);

module.exports = router;
