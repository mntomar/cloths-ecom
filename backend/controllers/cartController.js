const Cart = require('../models/Cart');

// Add to Cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    res.json({
      success: true,
      message: 'Product added to cart',
      cart
    });
  } catch (error) {
    console.error('Add to Cart Error:', error);
    res.status(500).json({ success: false, message: 'Failed to add to cart', error: error.message });
  }
};

// Remove from Cart
exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found.' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    res.json({
      success: true,
      message: 'Product removed from cart.',
      cart
    });
  } catch (error) {
    console.error('Remove Cart Item Error:', error);
    res.status(500).json({ success: false, message: 'Failed to remove item', error: error.message });
  }
};

//  Get Cart Item Count
exports.getCartItemCount = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });

    const totalItems = cart
      ? cart.items.reduce((total, item) => total + item.quantity, 0)
      : 0;

    res.json({ success: true, totalItems });
  } catch (error) {
    console.error('Get Cart Item Count Error:', error);
    res.status(500).json({ success: false, message: 'Failed to get item count', error: error.message });
  }
};

// Get Full Cart Details
exports.getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      return res.json({
        success: true,
        cart: {
          items: []
        }
      });
    }

    res.json({
      success: true,
      cart
    });
  } catch (error) {
    console.error('Get Cart Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch cart', error: error.message });
  }
};
