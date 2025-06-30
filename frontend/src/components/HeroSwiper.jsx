import { useState, useEffect } from 'react';

const HeroSwiper = ({ slides, interval = 3000, onSlideClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const validSlides = slides && slides.length > 0 ? slides : [
    {
      image: 'https://placehold.co/1200x400/a8dadc/1d3557?text=Welcome+to+Chlothzy',
    },
    {
      image: 'https://placehold.co/1200x400/e63946/f1faee?text=New+Arrivals+Coming+Soon!',
    },
    {
      image: 'https://placehold.co/1200x400/457b9d/f1faee?text=Shop+Our+Latest+Collection',
    },
  ];

  useEffect(() => {
    if (validSlides.length > 1) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % validSlides.length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [validSlides.length, interval]);

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % validSlides.length);
  };

  const goToPrev = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + validSlides.length) % validSlides.length
    );
  };

  const currentSlide = validSlides[currentImageIndex];

  const handleSlideClick = () => {
    if (onSlideClick && currentSlide.productId) {
      onSlideClick(currentSlide.productId);
    }
  };

  return (
    <div
      className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] overflow-hidden rounded-lg shadow-xl mb-8 cursor-pointer"
      onClick={handleSlideClick}
    >
      {/* Slide Image */}
      <img
        src={currentSlide.image}
        alt={`Hero banner ${currentImageIndex + 1}`}
        className="absolute top-0 left-0 w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/1200x400/cccccc/333333?text=Image+Load+Error';
        }}
      />

      {/* Navigation Arrows */}
      {validSlides.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none z-10"
          >
            &#8592;
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none z-10"
          >
            &#8594;
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {validSlides.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
          {validSlides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white' : 'bg-gray-400 bg-opacity-70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSwiper;
