import React from "react";
import HowItWorks from "../component/howWork";
import TestimonialsSection from "../component/testimonials";
import FeaturesSection from "../component/feuatereDesti";
import OpenInBrowserBanner from "../component/OpenInBrowserBanner";
import HeroSection from "../component/hero";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const LandingPage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#010038] text-white/90">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/ChatGPT Image 26 Ιουν 2026, 11_19_25 πμ αντίγραφο.png"
          alt=""
          fill
          priority
          className="object-cover object-top opacity-70"
        />
      </div>

      {/* Dark overlay */}
      <div className="fixed inset-0 z-0 bg-[#010038]/55" />

      <OpenInBrowserBanner />
      {/* Content */}
      <div className="relative z-10">
  
        <HeroSection />
        <HowItWorks />
        <FeaturesSection />
        <TestimonialsSection />

        <footer className="border-t border-white/10  bg-transparent py-10 backdrop-blur-sm">
          <div className="container mx-auto grid grid-cols-1 gap-8 px-6 sm:grid-cols-3 sm:px-12 lg:px-16">
            <div className="mt-9 text-start sm:text-left">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/ChatGPT Image 10 Μαρ 2026, 04_35_50 μμ.png"
                  alt="Trip Planner Logo"
                  width={70}
                  height={70}
                  className="object-contain"
                />

                <h3 className="text-xl font-semibold tracking-tight text-white">
                  Tripaki
                </h3>
              </Link>

              <p className="mt-4 text-sm text-white/70">
                Plan simply. Travel smarter.
              </p>
            </div>

            <div />

            <div className="text-center sm:text-right">
              <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>

              <div className="flex justify-center space-x-6 sm:justify-end">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="text-2xl text-white hover:text-gray-200 transition" />
                </a>

                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-2xl text-white hover:text-gray-200 transition" />
                </a>

                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-2xl text-white hover:text-gray-200 transition" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-center">
            <p className="text-sm text-white/60">
              &copy; {new Date().getFullYear()} Tripaki. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default LandingPage;