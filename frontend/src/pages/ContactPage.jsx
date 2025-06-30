
import Navbar from '../components/Navbar'; //  Adjust path if needed

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navbar />

      <div
        className="relative bg-cover bg-center py-16 px-4"
        style={{ backgroundImage: "url('https://placehold.co/1200x800/2a9d8f/ffffff?text=Contact+Us+Background')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="container mx-auto relative z-10">
          <h1 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-lg">
            Contact Us
          </h1>

          <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-6 lg:p-8 max-w-3xl mx-auto backdrop-filter backdrop-blur-sm">
            <p className="text-gray-700 text-lg mb-4 leading-relaxed">
              We'd love to hear from you! Whether you have a question about our products, need assistance with an order, or just want to give feedback, feel free to reach out.
            </p>

            <div className="space-y-4 text-left inline-block">
              <p className="text-gray-800 text-xl font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email: <span className="ml-2 font-normal text-indigo-600">support@Online.com</span>
              </p>

              <p className="text-gray-800 text-xl font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.135a11.249 11.249 0 005.139 5.139l1.135-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone: <span className="ml-2 font-normal text-indigo-600">+91 9998885456</span>
              </p>

              <p className="text-gray-800 text-xl font-semibold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 2.0 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Address: <span className="ml-2 font-normal text-indigo-600">123 Mumbai, Style City, pin-224455</span>
              </p>
            </div>

            <img
              src="https://placehold.co/800x300/2a9d8f/ffc8dd?text=Contact+Us"
              alt="Contact Us"
              className="w-full rounded-lg mt-8 shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
