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

  // Handle hash navigation
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navigation />

      {/* Hero Section */}
      <section 
        id="home"
        className="bg-cover bg-center bg-no-repeat text-white py-24 md:py-40 px-4 md:px-6 relative min-h-screen flex items-center"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url("/images/home.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="flex items-center justify-center">
            {/* Center Content */}
            <div className="text-white text-center max-w-3xl">
              <div className="inline-block px-6 py-2 bg-blue-600 rounded-full mb-6 border border-blue-400 animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                <p className="text-sm font-semibold">Welcome to  Pradesha Shaba - Addalaichenai.</p>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
                Your Voice Matters
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
                Report issues affecting your community and track their resolution in real-time. We're committed to transparent service delivery and citizen satisfaction.
              </p>
              
              {!isUser ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-down" style={{ animationDelay: '0.4s' }}>
                  <Link
                    href="/complaint/create"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3.5 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl text-center transform hover:scale-105 active:scale-95"
                  >
                    File a Complaint
                  </Link>
                  <Link
                    href="/auth/register"
                    className="border-2 border-white hover:bg-white/20 text-white px-8 py-3.5 rounded-lg font-bold transition-all duration-300 text-center transform hover:scale-105 active:scale-95"
                  >
                    Register Now
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-down" style={{ animationDelay: '0.4s' }}>
                  <Link
                    href="/complaint/create"
                    className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3.5 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl text-center transform hover:scale-105 active:scale-95"
                  >
                    File a Complaint
                  </Link>
                  <Link
                    href="/complaint"
                    className="border-2 border-white hover:bg-white/10 text-white px-8 py-3.5 rounded-lg font-bold transition-all duration-300 text-center transform hover:scale-105 active:scale-95"
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
      <section id="about" className="py-20 md:py-32 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16 animate-fade-in-down">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
              Our Vision & Mission
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
              Committed to transforming our community through transparent governance and active citizen engagement.
            </p>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Vision Card */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-100 animate-slide-in-left">
              <div className="relative p-8 md:p-10">
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Vision</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Build a clean, green, and developed community with better services and quality of life through transparency, participation, and innovation. We empower citizens to shape their future.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-green-100 animate-slide-in-right">
              <div className="relative p-8 md:p-10">
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Mission</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Provide efficient services, protect the environment, and promote community participation for a healthy and prosperous life. We resolve citizen complaints promptly and improve public services continuously.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 animate-scale-in">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Core Values</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: 'Transparency', desc: 'Open and honest communication' },
                { title: 'Accountability', desc: 'Responsible decision making' },
                { title: 'Participation', desc: 'Community involvement' },
                { title: 'Sustainability', desc: 'Long-term growth' }
              ].map((value, idx) => (
                <div key={idx} className="text-center animate-float-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <h4 className="font-bold mb-2 text-lg">{value.title}</h4>
                  <p className="text-gray-300 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16 animate-fade-in-down">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
              Services We Provide
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
              Dedicated to maintaining the highest standards of civic management and infrastructure.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {/* Waste Management */}
            <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="relative h-32 bg-gradient-to-br from-green-600 to-green-700 overflow-hidden">
                <img 
                  src="/images/service-waste-management.jpg" 
                  alt="Waste Management" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Waste Management</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Daily waste collection and proper disposal systems for community.
                </p>
              </div>
            </div>

            {/* Street Lighting */}
            <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative h-32 bg-gradient-to-br from-yellow-500 to-yellow-600 overflow-hidden">
                <img 
                  src="/images/service-street-lights.jpg" 
                  alt="Street Lighting" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Street Lighting</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Maintenance of street lights for safe roads at night.
                </p>
              </div>
            </div>

            {/* Drainage Systems */}
            <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="relative h-32 bg-gradient-to-br from-blue-600 to-blue-700 overflow-hidden">
                <img 
                  src="/images/service-drainage-maintenance.jpg" 
                  alt="Drainage Systems" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Drainage Systems</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Regular drainage maintenance and blockage resolution.
                </p>
              </div>
            </div>

            {/* Roads & Repairs */}
            <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="relative h-32 bg-gradient-to-br from-gray-600 to-gray-700 overflow-hidden">
                <img 
                  src="/images/service-road-maintenance.jpg" 
                  alt="Roads & Repairs" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Roads & Repairs</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Repair damaged roads and maintain safe access routes.
                </p>
              </div>
            </div>

            {/* General Support */}
            <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="relative h-32 bg-gradient-to-br from-purple-600 to-purple-700 overflow-hidden">
                <img 
                  src="/images/service-general-support.jpg" 
                  alt="General Support" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">General Support</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Submit other concerns and suggestions for improvement.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12 md:mt-16 animate-fade-in-down" style={{ animationDelay: '0.6s' }}>
            <Link
              href="/complaint/create"
              className="inline-block px-8 md:px-10 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300 text-base md:text-lg transform hover:scale-105 active:scale-95"
            >
              Report an Issue Now
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="complaint" className="py-20 md:py-32 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16 animate-fade-in-down">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
              How to File a Complaint
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
              Simple 4-step process to report issues and track their resolution in real-time.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative text-center group animate-float-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex flex-col h-full">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg transform group-hover:shadow-2xl">
                  1
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Create Account</h3>
                <p className="text-gray-600 flex-grow">
                  Register using your email or phone to access the system securely.
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transform translate-y-0"></div>
            </div>

            {/* Step 2 */}
            <div className="relative text-center group animate-float-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col h-full">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg transform group-hover:shadow-2xl">
                  2
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">File Complaint</h3>
                <p className="text-gray-600 flex-grow">
                  Submit your complaint with description, images, and location.
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-green-400 to-green-600 transform translate-y-0"></div>
            </div>

            {/* Step 3 */}
            <div className="relative text-center group animate-float-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col h-full">
                <div className="bg-yellow-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg transform group-hover:shadow-2xl">
                  3
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Track Progress</h3>
                <p className="text-gray-600 flex-grow">
                  Monitor status with real-time updates and notifications.
                </p>
              </div>
              <div className="hidden md:block absolute top-8 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 transform translate-y-0"></div>
            </div>

            {/* Step 4 */}
            <div className="relative text-center group animate-float-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-col h-full">
                <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg transform group-hover:shadow-2xl">
                  ✓
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Resolution</h3>
                <p className="text-gray-600 flex-grow">
                  Receive confirmation once your issue is addressed.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 bg-blue-50 rounded-2xl p-8 md:p-10 border border-blue-200 animate-slide-up">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-bold text-gray-900 mb-2">Fast Processing</h4>
                <p className="text-gray-600 text-sm">Average response time: 24-48 hours</p>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-gray-900 mb-2">Secure & Confidential</h4>
                <p className="text-gray-600 text-sm">Your information is protected and secure</p>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-gray-900 mb-2">24/7 Access</h4>
                <p className="text-gray-600 text-sm">File complaints anytime, anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20 animate-fade-in-down">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-down" style={{ animationDelay: '0.1s' }}>
              Get In Touch
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
              Have questions or need assistance? Our team is ready to help you. Reach out to us through any of the channels below.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {/* Phone Card */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-blue-500 hover:from-gray-750 transition-all duration-300 animate-slide-up shadow-lg hover:shadow-2xl hover:shadow-blue-500/20" style={{ animationDelay: '0.1s' }}>
              <div className="flex flex-col h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Phone</h3>
                <p className="text-gray-300 font-medium text-base mb-2">+94 (0) XXX XXX XXXX</p>
                <p className="text-gray-500 text-sm flex-grow">Mon-Sat, 8AM-5PM</p>
                <a href="tel:+94" className="mt-4 text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors">Call Now →</a>
              </div>
            </div>

            {/* Email Card */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300 animate-slide-up shadow-lg hover:shadow-2xl hover:shadow-purple-500/20" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Email</h3>
                <p className="text-gray-300 font-medium text-base mb-2 break-all">info@pradeshya.lk</p>
                <p className="text-gray-500 text-sm flex-grow">24-hour response</p>
                <a href="mailto:info@pradeshya.lk" className="mt-4 text-purple-400 hover:text-purple-300 font-semibold text-sm transition-colors">Send Email →</a>
              </div>
            </div>

            {/* Location Card */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-red-500 transition-all duration-300 animate-slide-up shadow-lg hover:shadow-2xl hover:shadow-red-500/20" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Address</h3>
                <p className="text-gray-300 font-medium text-base mb-2">Pradeshiya Sabha</p>
                <p className="text-gray-500 text-sm flex-grow">Addalachenai, Sri Lanka</p>
                <a href="https://maps.app.goo.gl/sQSgHAfeEwF8XmrY7" target="_blank" rel="noopener noreferrer" className="mt-4 text-red-400 hover:text-red-300 font-semibold text-sm transition-colors">View Map →</a>
              </div>
            </div>

            {/* Hours Card */}
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-green-500 transition-all duration-300 animate-slide-up shadow-lg hover:shadow-2xl hover:shadow-green-500/20" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-col h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Hours</h3>
                <p className="text-gray-300 font-medium text-sm mb-2">Mon-Fri: 8AM - 5PM</p>
                <p className="text-gray-500 text-sm flex-grow">Emergency: 24/7</p>
                <div className="mt-4 inline-block">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-600/20 text-green-300 border border-green-600/30">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Open Now
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Office Location Details */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-10 md:p-14 border border-gray-700 shadow-xl">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-4">Main Office</h4>
                  <div className="space-y-3">
                    <p className="text-gray-300 text-lg leading-relaxed">
                      <span className="font-semibold">Pradeshiya Sabha</span><br/>
                      Addalachenai<br/>
                      Ampara District<br/>
                      Sri Lanka
                    </p>
                    <a
                      href="https://maps.app.goo.gl/sQSgHAfeEwF8XmrY7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold transition-colors group/link"
                    >
                      <svg className="w-5 h-5 mr-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-4">Working Hours</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                      <span className="text-gray-300 font-semibold">Monday - Friday</span>
                      <span className="text-gray-400">8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                      <span className="text-gray-300 font-semibold">Saturday</span>
                      <span className="text-gray-400">9:00 AM - 1:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                      <span className="text-gray-300 font-semibold">Sunday & Holidays</span>
                      <span className="text-red-400 font-semibold">Closed</span>
                    </div>
                    <div className="pt-2 mt-4 border-t border-gray-600">
                      <p className="text-sm text-gray-400">
                        <span className="font-semibold text-yellow-400">Emergency Hotline:</span> Available 24/7
                      </p>
                    </div>
                  </div>
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
