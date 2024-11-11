import { FaPlane, FaTrain, FaBus, FaCar } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className=" bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 text-white z-50 fixed w-full top-0  px-6 sm:px-12 md:px-16 py-6">
      <div className="flex justify-between items-center">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-3">
          <FaPlane className="text-4xl" />
          <h1 className="text-2xl font-bold tracking-widest">TripPlanner</h1>
        </div>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-10 text-lg">
          <a
            href="#hero"
            className="relative group pt-6"
          >
            <span className="transition-all duration-300 ease-in-out">Home</span>
            <span className="absolute left-0 -bottom-1 w-full h-1 rounded-sm bg-white scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
          </a>
          <a
            href="#howitworks"
            className="relative group pt-6"
          >
            <span className="transition-all duration-300 ease-in-out">How It Works</span>
            <span className="absolute left-0 -bottom-1 w-full  h-1 rounded-sm bg-white scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
          </a>
          <a
            href="#testimonials"
            className="relative group pt-6"
          >
            <span className="transition-all duration-300 ease-in-out">Testimonials</span>
            <span className="absolute left-0 -bottom-1 w-full  h-1 rounded-sm    bg-white scale-x-0 group-hover:scale-x-100 transition-all duration-300"></span>
          </a>
          <button className="bg-gradient-to-r from-teal-400 to-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out border-2 border-transparent hover:border-white hover:shadow-xl transform hover:scale-105">
             sign up
          </button>
        </div>

        {/* Mobile Hamburger Menu for smaller screens */}
        <div className="md:hidden flex items-center">
          <button className="text-3xl focus:outline-none">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
