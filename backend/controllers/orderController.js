const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');

exports.placeOrder = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let totalAmount = 0;
    const products = cart.items.map((item) => {
      totalAmount += item.productId.price * item.quantity;
      return {
        productId: item.productId._id,
        quantity: item.quantity,
      };
    });

    const newOrder = new Order({
      userId,
      products,
      totalAmount,
    });

    await newOrder.save();

    // Clear cart after placing order
    cart.items = [];
    await cart.save();

    res.json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
