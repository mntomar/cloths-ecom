import Navbar from "../components/Navbar";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar />
      <div
        className="relative bg-cover bg-center py-16 px-4"
        style={{ backgroundImage: "url('https://placehold.co/1200x800/1a759f/ffffff?text=About+Us+Background')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto relative z-10">
          <h1 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-lg">
            About Online Shop
          </h1>
          <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-6 lg:p-8 max-w-3xl mx-auto backdrop-filter backdrop-blur-sm">
            <p className="text-gray-700 text-lg mb-4 leading-relaxed">
              Welcome to Online Shop, your ultimate destination for stylish and high-quality products across various categories. We are passionate about bringing you the latest trends in clothing, innovative electronics, comfortable furniture, and versatile accessories.
            </p>
            <p className="text-gray-700 text-lg mb-4 leading-relaxed">
              Our mission is to provide an unparalleled shopping experience with a focus on customer satisfaction, quality assurance, and diverse product selection. We carefully curate our collection to ensure that every item meets our high standards of design and durability.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              At Online Shop, we believe in making fashion and technology accessible to everyone. Thank you for choosing us for your shopping needs!
            </p>
            <img
              src="https://placehold.co/800x300/457b9d/f1faee?text=Our+Team"
              alt="Our Team"
              className="w-full rounded-lg mt-8 shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
