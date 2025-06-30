const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  addToCart,
  removeFromCart,
  getCartItemCount,
  getCart,
} = require('../controllers/cartController');

router.post('/add', authMiddleware, addToCart);
router.delete('/remove/:productId', authMiddleware, removeFromCart);
router.get('/count', authMiddleware, getCartItemCount);
router.get('/', authMiddleware, getCart);

module.exports = router;
