import  { useState } from 'react';

const ProductSwiper = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const validImages = images && images.length > 0
    ? images
    : ['https://placehold.co/600x400/cccccc/333333?text=No+Image'];

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % validImages.length);
  };

  const goToPrev = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + validImages.length) % validImages.length
    );
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-md mb-6">
      <img
        src={validImages[currentImageIndex]}
        alt={`Product view ${currentImageIndex + 1}`}
        className="w-full h-72 object-contain bg-gray-100 rounded-lg"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/600x400/cccccc/333333?text=Image+Load+Error';
        }}
      />

      {validImages.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Thumbnail Pagination */}
      {validImages.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2 p-2 bg-gray-900 bg-opacity-40 rounded-b-lg">
          {validImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                index === currentImageIndex ? 'border-indigo-500' : 'border-transparent'
              } hover:border-indigo-400 transition-all duration-200`}
              onClick={() => setCurrentImageIndex(index)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/50x50/eeeeee/888888?text=X';
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSwiper;
