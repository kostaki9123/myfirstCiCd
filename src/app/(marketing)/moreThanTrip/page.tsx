import React from 'react'
import HowItWorks from '../component/howWork'
import Testimonials from '../component/testimonials'

import TestimonialsSection from '../component/testimonials'
import FeaturesSection from '../component/feuatereDesti'
import OpenInBrowserBanner from '../component/OpenInBrowserBanner'
import HeroSection from '../component/hero'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

const LandingPage = () => {
  return (
    <div className=' bg-gradient-to-r from-[#010038] via-white/5 to-[#010038] text-white/90 '>
      <OpenInBrowserBanner/>
      <HeroSection/>
      <HowItWorks/>
      <FeaturesSection />
 
      <TestimonialsSection/>
      <footer className="bg-gradient-to-r text-white py-10">
      <div className="container mx-auto px-6 sm:px-12 lg:px-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
        
        {/* Brand Info */}
        <div className="text-start sm:text-left mt-9 ">
          <Link
                href="/"
                className="relative w-[200px] md:ml-5 flex justify-center items-center "
              >
                <Image
                  src="/ChatGPT Image 10 Μαρ 2026, 04_35_50 μμ.png"
                  alt="Trip Planner Logo"
                  width={90}
                  height={90}
                  className="object-contain mt-2 absolute left-0 md:left-3"
                />
              
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-white absolute left-16 md:left-20">
                  Tripaki
                </h3>
             </Link>
          <p className="mt-4 text-center text-sm">
                 Plan simply. Travel smarter.
          </p>
        </div>
        
        {/* Quick Links */}
        <div className="text-center w-20">
         
          
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
      <div className="mt-8 text-center border-t border-white/5 pt-6">
        <p className="text-sm">&copy; {new Date().getFullYear()} YourTrip. All rights reserved.</p>
      </div>
    </footer>
  
    </div>
  )
}

export default LandingPage