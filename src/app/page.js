'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default function Home() {
  const [isUser, setIsUser] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/token-check');
        if (response.ok) {
          setIsUser(true);
        }
      } catch (error) {
        setIsUser(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navigation />

      {/* Hero Section */}
      <section 
        id="home"
        className="bg-cover bg-center bg-no-repeat text-white py-24 md:py-40 px-4 md:px-6 relative min-h-screen flex items-center"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url("/images/home.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="flex items-center justify-center">
            {/* Center Content */}
            <div className="text-white text-center max-w-2xl">
              <div className="inline-block px-4 py-2 bg-blue-500/40 backdrop-blur-sm rounded-full mb-6 border border-blue-300/50">
                <p className="text-sm font-semibold">Welcome to Pradeshiya Sabha</p>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Voice Matters
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                Report issues affecting your community and track their resolution in real-time. We're committed to transparent service delivery and citizen satisfaction.
              </p>
              
              {!isUser ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/complaint/create"
                    className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3.5 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                  >
                    File a Complaint
                  </Link>
                  <Link
                    href="/auth/register"
                    className="border-2 border-white hover:bg-white/10 text-white px-8 py-3.5 rounded-lg font-bold transition-all duration-300 text-center"
                  >
                    Register Now
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/complaint/create"
                    className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3.5 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                  >
                    File a Complaint
                  </Link>
                  <Link
                    href="/complaint"
                    className="border-2 border-white hover:bg-white/10 text-white px-8 py-3.5 rounded-lg font-bold transition-all duration-300 text-center"
                  >
                    View My Complaints
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Us - Vision & Mission Section */}
      <section id="about" className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-4 border border-blue-200">
              <p className="text-blue-600 text-sm font-semibold">About Us</p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Vision & Mission
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Committed to transforming our community through transparent governance and active citizen engagement.
            </p>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Vision Card */}
            <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-50 group-hover:to-transparent transition-all duration-300"></div>
              <div className="relative p-8 md:p-10">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To build a clean, green, and developed community with better services and quality of life through transparency, participation, and innovation. We believe in empowering citizens to shape their own future.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/0 to-green-600/0 group-hover:from-green-50 group-hover:to-transparent transition-all duration-300"></div>
              <div className="relative p-8 md:p-10">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To provide efficient services, protect the environment, and promote community participation for a healthy and prosperous life. We focus on resolving citizen complaints promptly and improving public services continuously.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Core Values</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: '✓', title: 'Transparency', desc: 'Open and honest communication' },
                { icon: '💪', title: 'Accountability', desc: 'Responsible decision making' },
                { icon: '🤝', title: 'Participation', desc: 'Community involvement' },
                { icon: '🌱', title: 'Sustainability', desc: 'Long-term growth' }
              ].map((value, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl mb-3">{value.icon}</div>
                  <h4 className="font-bold mb-2">{value.title}</h4>
                  <p className="text-gray-300 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-4 border border-blue-200">
              <p className="text-blue-600 text-sm font-semibold">Our Services</p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Services We Provide
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Dedicated to maintaining the highest standards of civic management and infrastructure for our community members.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 place-items-stretch">
            {/* 5 Service Items - Responsive Layout */}
            {/* Waste Management */}
            <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
              <div className="relative h-48 bg-gradient-to-br from-green-400 to-green-500 overflow-hidden">
                <img 
                  src="/images/service-waste-management.jpg" 
                  alt="Waste Management" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="mb-3">
                  <span className="text-3xl">♻️</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Waste Management</h3>
                <p className="text-gray-600 leading-relaxed">
                  Daily waste collection and proper disposal. We encourage residents to keep surroundings clean and support recycling programs for a healthier community.
                </p>
              </div>
            </div>

            {/* Street Light Issues */}
            <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
              <div className="relative h-48 bg-gradient-to-br from-yellow-300 to-yellow-400 overflow-hidden">
                <img 
                  src="/images/service-street-lights.jpg" 
                  alt="Street Light Issues" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="mb-3">
                  <span className="text-3xl">💡</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Street Lighting</h3>
                <p className="text-gray-600 leading-relaxed">
                  Repairs and maintenance of street lights ensuring safe, well-lit roads for pedestrians and vehicles at night.
                </p>
              </div>
            </div>

            {/* Drainage Issues */}
            <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-500 overflow-hidden">
                <img 
                  src="/images/service-drainage-maintenance.jpg" 
                  alt="Drainage Issues" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="mb-3">
                  <span className="text-3xl">💧</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Drainage Systems</h3>
                <p className="text-gray-600 leading-relaxed">
                  Attend to drainage problems including blockages and water overflow. Regular maintenance prevents flooding and environmental issues.
                </p>
              </div>
            </div>

            {/* Road & Construction */}
            <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
              <div className="relative h-48 bg-gradient-to-br from-gray-500 to-gray-600 overflow-hidden">
                <img 
                  src="/images/service-road-maintenance.jpg" 
                  alt="Road and Construction Issues" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="mb-3">
                  <span className="text-3xl">🛣️</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Roads & Repairs</h3>
                <p className="text-gray-600 leading-relaxed">
                  Report damaged roads, potholes, and construction issues. We maintain safe and accessible roads for all community members.
                </p>
              </div>
            </div>

            {/* General Complaints */}
            <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
              <div className="relative h-48 bg-gradient-to-br from-purple-400 to-purple-500 overflow-hidden">
                <img 
                  src="/images/service-general-support.jpg" 
                  alt="General Complaints" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="mb-3">
                  <span className="text-3xl">💬</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">General Support</h3>
                <p className="text-gray-600 leading-relaxed">
                  Have other concerns? Submit general complaints and suggestions to help us improve services and better serve the community.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12 md:mt-16">
            <Link
              href="/complaint/create"
              className="inline-block px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 text-base md:text-lg"
            >
              Report an Issue Now
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="complaint" className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block px-4 py-2 bg-green-100 rounded-full mb-4 border border-green-200">
              <p className="text-green-600 text-sm font-semibold">Process</p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How to File a Complaint
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Simple 4-step process to report issues and track their resolution in real-time.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative text-center group">
              <div className="flex flex-col h-full">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  1
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Create Account</h3>
                <p className="text-gray-600 flex-grow">
                  Register using your email or phone number to access the complaint system securely.
                </p>
              </div>
              {/* Connector */}
              <div className="hidden md:block absolute top-8 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transform translate-y-0"></div>
            </div>

            {/* Step 2 */}
            <div className="relative text-center group">
              <div className="flex flex-col h-full">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  2
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">File Complaint</h3>
                <p className="text-gray-600 flex-grow">
                  Submit your complaint with detailed description, images, and location information.
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-green-400 to-green-600 transform translate-y-0"></div>
            </div>

            {/* Step 3 */}
            <div className="relative text-center group">
              <div className="flex flex-col h-full">
                <div className="bg-yellow-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  3
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Track Progress</h3>
                <p className="text-gray-600 flex-grow">
                  Monitor the status with real-time updates and notifications every step of the way.
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 transform translate-y-0"></div>
            </div>

            {/* Step 4 */}
            <div className="relative text-center group">
              <div className="flex flex-col h-full">
                <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  ✓
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Resolution</h3>
                <p className="text-gray-600 flex-grow">
                  Receive confirmation once your complaint has been resolved and the issue is addressed.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 bg-blue-50 rounded-2xl p-8 md:p-10 border border-blue-200">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="font-bold text-gray-900 mb-2">Fast Processing</h4>
                <p className="text-gray-600 text-sm">Average response time: 24-48 hours</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🔒</div>
                <h4 className="font-bold text-gray-900 mb-2">Secure & Confidential</h4>
                <p className="text-gray-600 text-sm">Your information is protected and secure</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📱</div>
                <h4 className="font-bold text-gray-900 mb-2">24/7 Access</h4>
                <p className="text-gray-600 text-sm">File complaints anytime, anywhere, from any device</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 px-4 md:px-6 bg-gray-200 text-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block px-4 py-2 bg-blue-900 rounded-full mb-4 border border-blue-700">
              <p className="text-blue-300 text-sm font-semibold">Get in Touch</p>
            </div>
            <h2 className="text-3xl text-black md:text-4xl lg:text-5xl font-bold mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help. Reach out through any of these channels.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {/* Phone Card */}
            <div className="group relative bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:bg-gray-750">
              <div className="mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">📞</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
              </div>
              <p className="text-gray-300 font-medium text-sm">+94 (0) XXX XXX XXXX</p>
              <p className="text-gray-400 text-xs mt-1">Mon-Sat, 8AM-5PM</p>
            </div>

            {/* Email Card */}
            <div className="group relative bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:bg-gray-750">
              <div className="mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">📧</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
              </div>
              <p className="text-gray-300 font-medium text-sm break-all">info@pradeshyasabha.lk</p>
              <p className="text-gray-400 text-xs mt-1">24-hour response</p>
            </div>

            {/* Location Card */}
            <div className="group relative bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700 hover:border-red-500 transition-all duration-300 hover:bg-gray-750">
              <div className="mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">📍</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Address</h3>
              </div>
              <p className="text-gray-300 font-medium text-sm">Pradeshiya Sabha Addalachenai</p>
              <p className="text-gray-400 text-xs mt-1">Sri Lanka</p>
            </div>

            {/* Hours Card */}
            <div className="group relative bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700 hover:border-green-500 transition-all duration-300 hover:bg-gray-750">
              <div className="mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">🕐</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Hours</h3>
              </div>
              <p className="text-gray-300 font-medium text-xs">Mon-Fri: 8AM - 5PM</p>
              <p className="text-gray-300 font-medium text-xs mt-1">Emergency: 24/7</p>
            </div>
          </div>

          {/* Office Location Details */}
          <div className="bg-gray-800 rounded-2xl p-8 md:p-10 border border-gray-700">
            <h3 className="text-2xl font-bold mb-6">Office Details</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-blue-400 mb-4">Main Office Location</h4>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Pradeshiya Sabha Office<br/>
                  Addalachenai<br/>
                  Ampara District<br/>
                  Sri Lanka
                </p>
                <Link
                  href="https://maps.google.com"
                  target="_blank"
                  className="inline-block text-blue-400 hover:text-blue-300 font-semibold"
                >
                  Get Directions →
                </Link>
              </div>
              <div>
                <h4 className="font-bold text-blue-400 mb-4">Working Hours</h4>
                <div className="text-gray-300 space-y-2">
                  <p><span className="font-semibold">Monday - Friday:</span> 8:00 AM - 5:00 PM</p>
                  <p><span className="font-semibold">Saturday:</span> 9:00 AM - 1:00 PM</p>
                  <p><span className="font-semibold">Sunday & Holidays:</span> Closed</p>
                  <p className="text-xs text-gray-400 mt-4">Emergency hotline: Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
