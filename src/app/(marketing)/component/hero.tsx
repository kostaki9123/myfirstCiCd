import { FaPlane, FaTrain, FaBus, FaCar } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600  text-white py-24 sm:py-32 md:py-40 h-[100vh] overflow-hidden"
    >
      {/* Background Lines/Map Concept */}
      <div className="absolute inset-0 flex justify-center items-center z-0 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-20" viewBox="0 0 1200 800">
          <line x1="150" y1="300" x2="700" y2="600" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="500" y1="400" x2="1000" y2="200" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="200" y1="100" x2="1100" y2="500" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
          <circle cx="150" cy="300" r="10" fill="white" />
          <circle cx="700" cy="600" r="10" fill="white" />
          <circle cx="500" cy="400" r="10" fill="white" />
          <circle cx="1000" cy="200" r="10" fill="white" />
          <circle cx="200" cy="100" r="10" fill="white" />
          <circle cx="1100" cy="500" r="10" fill="white" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="container mx-auto text-center relative z-10 px-6 sm:px-12 md:px-16 pt-14 md:pt-0 lg:pt-14">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
          Your Adventure Begins Here
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8">
          Explore the world with ease. Customize your dream trip, plan every detail, and make memories.
        </p>
        <a
          href="#signup"
          className="bg-gray-800 text-white py-3 px-12 rounded-full text-lg font-semibold hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Get Started for Free
        </a>
      </div>

      {/* Location Pin Icons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <MdLocationOn className="text-white text-6xl animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
