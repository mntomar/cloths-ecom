
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); //  Import your Product Mongoose model
const products = require('./data/products'); //  Your products array (the one you posted)

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected for seeding...');
  importData();
})
.catch((error) => {
  console.error('MongoDB connection failed:', error);
  process.exit(1);
});

// Function to import products
const importData = async () => {
  try {
    await Product.deleteMany(); 
    await Product.insertMany(products); // Insert products array
    console.log('Product Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error with data import:', error);
    process.exit(1);
  }
};
