const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Server error while fetching products.' });
  }
});

// GET /api/products/:id - Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    res.status(500).json({ message: 'Server error while fetching product.' });
  }
});

module.exports = router;
