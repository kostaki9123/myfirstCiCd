import { FaPlane, FaTrain, FaBus, FaCar } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative bg-gradient-to-r  text-white py-24 sm:py-32 md:py-40 h-[60vh] overflow-hidden"
    >
      {/* Background Lines/Map Concept */}
      <div className="absolute inset-20 flex justify-center items-center z-0 pointer-events-none">
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
      <div className="container  mx-auto text-center relative z-10 px-6 sm:px-12 md:px-16 pt-14 md:pt-0 lg:pt-14 mt-5">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
           Plan Every Part of Your Journey
        </h1>
        <p className="text-lg sm:text-xl md:text-xl mb-8 text-white/70 max-w-2xl mx-auto leading-relaxed">
          We don’t build your trip for you — we help you build it better from your own ideas.
        </p>
        <a
          href="/sign-in"
          className="bg-[#0356BC] hover:bg-[#0466D9] text-white border border-white/10 shadow-lg
                 shadow-blue-950/40  rounded-xl  transition-all duration-200 active:scale-[0.98] py-3 px-12  text-lg font-semibold hover:bg-gray-70  hover:scale-105"
        >
          Get Started 
        </a>
      </div>

      {/* Location Pin Icons */}
      
    </section>
  );
};

export default HeroSection;
