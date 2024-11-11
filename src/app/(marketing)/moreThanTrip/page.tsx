import React from 'react'
import HowItWorks from '../component/howWork'
import Testimonials from '../component/testimonials'

import TestimonialsSection from '../component/testimonials'
import FeaturesSection from '../component/feuatereDesti'

import HeroSection from '../component/hero'
import Navbar from '../component/navBar'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const LandingPage = () => {
  return (
    <div >
      <Navbar/>
      <HeroSection/>
      <HowItWorks/>
      <FeaturesSection />
 
      <TestimonialsSection/>
      <footer className="bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 text-white py-10">
      <div className="container mx-auto px-6 sm:px-12 lg:px-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
        
        {/* Brand Info */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-semibold">YourTrip</h2>
          <p className="mt-3 text-sm">
            Plan your next adventure with ease. Explore, customize, and make memories.
          </p>
        </div>
        
        {/* Quick Links */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#about" className="hover:underline">About Us</a></li>
            <li><a href="#destinations" className="hover:underline">Destinations</a></li>
            <li><a href="#services" className="hover:underline">Services</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        
        {/* Social Media Icons */}
        <div className="text-center sm:text-right">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center sm:justify-end space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-white text-2xl hover:text-gray-200 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-white text-2xl hover:text-gray-200 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white text-2xl hover:text-gray-200 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center border-t border-teal-300 pt-6">
        <p className="text-sm">&copy; {new Date().getFullYear()} YourTrip. All rights reserved.</p>
      </div>
    </footer>
  
    </div>
  )
}

export default LandingPage