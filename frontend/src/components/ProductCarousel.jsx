import { useRef } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductCarousel = ({ title, products }) => {
  const scrollContainer = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainer.current;
    const scrollAmount = 250; // Adjusted scroll distance for smaller cards
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative my-12">
      {/* Section Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 px-4">{title}</h2>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute top-1/2 -translate-y-1/2 left-0 z-10 p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow transition"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute top-1/2 -translate-y-1/2 right-0 z-10 p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow transition"
      >
        <ChevronRight size={16} />
      </button>

      {/* Product Slider */}
      <div
  ref={scrollContainer}
  className="flex overflow-x-auto gap-4 px-8 scrollbar-hide scroll-smooth"
>
  {products.map((product, index) => (
    <div key={product.id || index} className="w-[180px] flex-shrink-0">
      <ProductCard product={product} />
    </div>
  ))}
</div>
    </div>
  );
};

export default ProductCarousel;
