
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const path = require('path');

// Load environment variables
dotenv.config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const Product = require('./models/Product');
const products = require('./data/products');

const app = express();

// Connect to MongoDB
connectDB();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// Middleware - Body parsing
app.use(bodyParser.json());
app.use(express.json());

// CORS Setup - Allow Frontend to connect
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',  // ✅ Change this on deployment
  credentials: true,
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running 🚀' });
});

// Product Seeder - Run only if products collection is empty
async function seedProducts() {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany(products);
      console.log('Product seeding completed.');
    } else {
      console.log('Products already exist, skipping seeding.');
    }
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  }
}

seedProducts();

// 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong on server.' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
