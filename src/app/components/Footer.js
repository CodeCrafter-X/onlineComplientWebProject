'use client';

import Link from 'next/link';

export default function Footer() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-bold">PS</span>
              </div>
              <div>
                <h4 className="font-bold text-white">Pradeshiya Sabha</h4>
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
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('complaint')}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Complaints
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
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
                <Link href="/complaint/create" className="text-sm text-gray-400 hover:text-white transition-colors">
                  File Complaint
                </Link>
              </li>
              <li>
                <Link href="/complaint" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Track Status
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-sm text-gray-400 hover:text-white transition-colors">
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
              <p>&copy; 2024 Pradeshiya Sabha Addalachenai. All rights reserved.</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                WhatsApp
              </a>
            </div>

            {/* Footer Links */}
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <span className="text-gray-700">|</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
