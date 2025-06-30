import { useContext } from 'react';
import AppContext from '../context/AppContext';


const ProductCard = ({ product }) => {
  const { setSelectedProduct, setCurrentPage } = useContext(AppContext);
  const placeholderImageUrl = `https://placehold.co/400x300/a8dadc/1d3557?text=${encodeURIComponent(product.name)}`;

  const handleClick = () => {
    setSelectedProduct(product);
    setCurrentPage('productDetail');
  };
  
  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl relative cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={product.images && product.images[0] ? product.images[0] : placeholderImageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
        onError={(e) => { e.target.onerror = null; e.target.src = placeholderImageUrl; }}
      />
      <div className="p-4 flex flex-col justify-between h-[calc(100%-12rem)]">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-1">{product.brand}</p>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{product.description}</p>
        </div>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <span className="text-xl font-bold text-indigo-600">₹{product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
