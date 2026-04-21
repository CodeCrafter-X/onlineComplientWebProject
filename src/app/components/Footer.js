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
    <footer className="bg-black text-gray-300 py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8 md:mb-12">
          {/* Brand Section */}
          <div className="col-span-full md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.jpeg"
                alt="Pradesha Shaba Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h4 className="font-bold text-white">Pradesha Shaba</h4>
                <p className="text-xs text-gray-500">Addalachenai</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Serving the community with transparency, efficiency, and dedication to progress.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('complaint')}
                  className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  Complaints
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/complaint/create" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  File Complaint
                </Link>
              </li>
              <li>
                <Link href="/complaint" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Track Status
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Support</h4>
            <ul className="space-y-3">
              <li className="text-sm">
                <p className="text-gray-400">📞 Phone</p>
                <p className="text-white font-medium">+94 XXX XXX XXXX</p>
              </li>
              <li className="text-sm">
                <p className="text-gray-400">📧 Email</p>
                <p className="text-white font-medium break-all">info@pradeshyasabha.lk</p>
              </li>
              <li className="text-sm">
                <p className="text-gray-400">⏰ Available</p>
                <p className="text-white font-medium">24/7 Support</p>
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
