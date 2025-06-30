import { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import HeroSwiper from '../components/HeroSwiper';
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel';
import axiosInstance from '../api/axiosInstance';
import AppContext from '../context/AppContext';

const DashboardPage = () => {
  const { setCurrentPage, setSelectedProduct } = useContext(AppContext);

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [displayedHeroSlides, setDisplayedHeroSlides] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products');
        setProducts(response.data);

        // Build Hero Swiper slides with actual product IDs
        const slides = [
          {
            image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            productId: response.data[0]?._id,
          },
          {
            image: 'https://cdn.clothbase.com/uploads/3a6345e7-065d-4303-abee-52921f3c47db/image.jpg',
            productId: response.data[1]?._id,
          },
          {
            image: 'https://tse2.mm.bing.net/th/id/OIP.xDMfvyhxArnBOV_rfZ2gYgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
            productId: response.data[2]?._id,
          },
          {
            image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D',
            productId: response.data[3]?._id,
          },
        ];
        setDisplayedHeroSlides(slides);

      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products from server.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentPage('productDetail');
  };

  const handleSlideClick = (productId) => {
    const clickedProduct = products.find((p) => p._id === productId);
    if (clickedProduct) {
      setSelectedProduct(clickedProduct);
      setCurrentPage('productDetail');
    } else {
      console.warn('Product not found for hero slide productId:', productId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar />

      <main className="container mx-auto p-4">

        {/* ✅ Hero Swiper */}
        <HeroSwiper
          slides={displayedHeroSlides}
          interval={4000}
          onSlideClick={handleSlideClick}
        />

        {/* ✅ Product Carousel */}
        {products.length > 0 && (
          <ProductCarousel
            title="Shop Our Latest Arrivals"
            products={products.slice(0, 6)}
            onProductClick={handleProductClick}
          />
        )}

        {/* ✅ Category Filter Buttons */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Our Latest Collection
        </h1>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* ✅ Product Grid */}
        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default DashboardPage;
