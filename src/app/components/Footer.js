'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Footer() {
  const router = useRouter();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If element doesn't exist on current page, navigate to home page with hash
      router.push(`/#${id}`);
    }
  };

  return (
    <footer className="bg-black text-gray-300 py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col items-center justify-center text-center">
            <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Image
                src="/images/logo.jpeg"
                alt="Pradesha Shaba Logo"
                width={36}
                height={36}
                className="rounded-lg w-10 h-10 sm:w-12 sm:h-12"
              />
              <div>
                <h4 className="font-bold text-white text-base sm:text-lg md:text-xl">Pradesha Shaba</h4>
                <p className="text-sm sm:text-base text-gray-400">Addalachenai</p>
              </div>
            </div>
            <p className="text-sm sm:text-base md:text-base text-gray-300 leading-relaxed">
              Serving the community with transparency, efficiency, and dedication to progress.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center justify-center text-center">
            <h4 className="font-bold text-white mb-3 sm:mb-4 text-base sm:text-lg md:text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-sm sm:text-base text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-sm sm:text-base text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-sm sm:text-base text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('complaint')}
                  className="text-sm sm:text-base text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  Complaints
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-sm sm:text-base text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center justify-center text-center">
            <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-lg">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/complaint/create" className="text-xs sm:text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  File Complaint
                </Link>
              </li>
              <li>
                <Link href="/complaint" className="text-xs sm:text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Track Status
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-xs sm:text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-xs sm:text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="flex flex-col items-center justify-center text-center">
            <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-lg">Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="text-xs sm:text-sm">
                <p className="text-gray-400 text-xs sm:text-sm">📞 Phone</p>
                <p className="text-white font-medium text-xs sm:text-sm">+94 XXX XXX XXXX</p>
              </li>
              <li className="text-xs sm:text-sm">
                <p className="text-gray-400 text-xs sm:text-sm">📧 Email</p>
                <p className="text-white font-medium break-all text-xs sm:text-sm">info@pradeshyasabha.lk</p>
              </li>
              <li className="text-xs sm:text-sm">
                <p className="text-gray-400 text-xs sm:text-sm">⏰ Available</p>
                <p className="text-white font-medium text-xs sm:text-sm">24/7 Support</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 py-8 md:py-10">
          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500 text-center md:text-left">
              <p>&copy; 2024 Pradesha Shaba Addalachenai. All rights reserved.</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-6">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 hover:scale-110 transition-all duration-200 cursor-pointer text-sm font-medium">
                Facebook
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all duration-200 cursor-pointer text-sm font-medium">
                Twitter
              </a>
              <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 hover:scale-110 transition-all duration-200 cursor-pointer text-sm font-medium">
                WhatsApp
              </a>
            </div>

            {/* Footer Links */}
            <div className="flex gap-4 text-sm">
              <a href="/privacy-policy" className="text-gray-400 hover:text-white hover:translate-y-0.5 transition-all duration-200 cursor-pointer">
                Privacy Policy
              </a>
              <span className="text-gray-700">|</span>
              <a href="/terms-of-service" className="text-gray-400 hover:text-white hover:translate-y-0.5 transition-all duration-200 cursor-pointer">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
