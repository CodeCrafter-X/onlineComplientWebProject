'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default function Home() {
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

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

  // Services data
  const services = [
    {
      id: 'waste-management',
      title: 'Waste Management',
      category: 'Waste Management',
      image: '/images/service-waste-management.jpg',
      gradient: 'from-green-600 to-green-700',
      description: 'Daily waste collection and proper disposal systems for community',
      fullDescription: 'Our comprehensive waste management system ensures proper collection, segregation, and disposal of waste materials. We handle everything from residential waste to commercial debris, maintaining clean and healthy surroundings for the entire community.',
      services: [
        'Daily waste collection from residential areas',
        'Proper waste segregation and recycling',
        'Clean-up of public spaces',
        'Garbage bin maintenance'
      ]
    },
    {
      id: 'street-lighting',
      title: 'Street Lighting',
      category: 'Street Lighting',
      image: '/images/service-street-lights.jpg',
      gradient: 'from-yellow-500 to-yellow-600',
      description: 'Maintenance of street lights for safe roads at night',
      fullDescription: 'We maintain street lighting infrastructure to ensure safe and well-lit roads throughout the community. Our team conducts regular inspections, repairs, and replacements to keep all lights functional.',
      services: [
        'Street light installation and maintenance',
        'Emergency repairs for non-functional lights',
        'Regular inspections and testing',
        '24/7 emergency response'
      ]
    },
    {
      id: 'drainage-systems',
      title: 'Drainage Systems',
      category: 'Drainage Systems',
      image: '/images/service-drainage-maintenance.jpg',
      gradient: 'from-blue-600 to-blue-700',
      description: 'Regular drainage maintenance and blockage resolution',
      fullDescription: 'Our drainage system maintenance ensures proper water flow and prevents flooding. We handle blockage clearing, pipe repairs, and preventive maintenance to keep drainage systems functioning efficiently.',
      services: [
        'Drainage cleaning and de-silting',
        'Blockage removal and repairs',
        'Pipe maintenance and replacement',
        'Storm water management'
      ]
    },
    {
      id: 'roads-repairs',
      title: 'Roads & Repairs',
      category: 'Roads & Repairs',
      image: '/images/service-road-maintenance.jpg',
      gradient: 'from-gray-600 to-gray-700',
      description: 'Repair damaged roads and maintain safe access routes',
      fullDescription: 'We maintain and repair roads to ensure safe and smooth travel for all community members. Our team addresses potholes, cracks, and other road damage promptly.',
      services: [
        'Pothole repairs and road patching',
        'Road resurfacing and asphalt laying',
        'Road marking and signage',
        'Bridge and culvert maintenance'
      ]
    },
    {
      id: 'general-support',
      title: 'General Support',
      category: 'General Support',
      image: '/images/service-general-support.jpg',
      gradient: 'from-purple-600 to-purple-700',
      description: 'Submit other concerns and suggestions for improvement',
      fullDescription: 'Beyond our core services, we are here to address any community concerns and suggestions. Submit your concerns and help us improve our services.',
      services: [
        'General inquiries and support',
        'Community feedback and suggestions',
        'Special event coordination',
        'Emergency services coordination'
      ]
    }
  ];

  // Handle file complaint for specific issue
  const handleFileComplaint = async (categoryName) => {
    setIsCheckingAuth(true);
    try {
      const response = await fetch('/api/token-check', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        setIsCheckingAuth(false);
        setSelectedService(null);
        router.push(`/auth/login?redirect=/complaint/create?category=${encodeURIComponent(categoryName)}`);
        return;
      }

      const data = await response.json();
      if (data.isAuthenticated) {
        router.push(`/complaint/create?category=${encodeURIComponent(categoryName)}`);
      } else {
        setSelectedService(null);
        router.push(`/auth/login?redirect=/complaint/create?category=${encodeURIComponent(categoryName)}`);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setSelectedService(null);
      router.push(`/auth/login?redirect=/complaint/create?category=${encodeURIComponent(categoryName)}`);
    }
    setIsCheckingAuth(false);
  };

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
      <section id="about" className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20 animate-fade-in-down">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
              <span className="text-blue-600 font-semibold text-sm">WHO WE ARE</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 animate-fade-in-down leading-tight" style={{ animationDelay: '0.1s' }}>
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Vision & Mission</span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto animate-fade-in-down font-medium" style={{ animationDelay: '0.2s' }}>
              Committed to transforming our community through transparent governance and active citizen engagement for sustainable development.
            </p>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 md:mb-20">
            {/* Vision Card */}
            <div className="group relative bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-blue-200 hover:border-blue-400 animate-slide-in-left p-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-blue-400/0 group-hover:from-blue-400/5 group-hover:to-blue-400/10 transition-all duration-300"></div>
              
              <div className="relative p-8 md:p-12">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Vision</h3>
                <p className="text-gray-700 leading-relaxed text-lg md:text-base font-medium mb-6 min-h-24">
                  Build a clean, green, and developed community with better services and quality of life through transparency, participation, and innovation. We empower citizens to shape their future.
                </p>
                
                {/* Highlight Points */}
                <div className="space-y-3 pt-6 border-t border-blue-200">
                  <div className="flex items-center text-gray-700">
                    <span className="text-blue-600 font-bold mr-3">•</span>
                    <span className="text-sm font-medium">Sustainable development</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-blue-600 font-bold mr-3">•</span>
                    <span className="text-sm font-medium">Community empowerment</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-blue-600 font-bold mr-3">•</span>
                    <span className="text-sm font-medium">Enhanced quality of life</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative bg-gradient-to-br from-emerald-50 via-white to-emerald-50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-emerald-200 hover:border-emerald-400 animate-slide-in-right p-0">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 to-emerald-400/0 group-hover:from-emerald-400/5 group-hover:to-emerald-400/10 transition-all duration-300"></div>
              
              <div className="relative p-8 md:p-12">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Mission</h3>
                <p className="text-gray-700 leading-relaxed text-lg md:text-base font-medium mb-6 min-h-24">
                  Provide efficient services, protect the environment, and promote community participation for a healthy and prosperous life. We resolve citizen complaints promptly and improve public services continuously.
                </p>
                
                {/* Highlight Points */}
                <div className="space-y-3 pt-6 border-t border-emerald-200">
                  <div className="flex items-center text-gray-700">
                    <span className="text-emerald-600 font-bold mr-3">•</span>
                    <span className="text-sm font-medium">Efficient service delivery</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-emerald-600 font-bold mr-3">•</span>
                    <span className="text-sm font-medium">Environmental protection</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-emerald-600 font-bold mr-3">•</span>
                    <span className="text-sm font-medium">Citizen participation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="mt-16 md:mt-20">
            <div className="text-center mb-12 md:mb-16 animate-fade-in-down" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Core Values</span></h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">Principles that guide our decisions and actions every day</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { 
                  title: 'Transparency', 
                  desc: 'Open and honest communication with citizens',
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  gradient: 'from-blue-500 to-blue-600'
                },
                { 
                  title: 'Accountability', 
                  desc: 'Responsible decision making and actions',
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  gradient: 'from-emerald-500 to-emerald-600'
                },
                { 
                  title: 'Participation', 
                  desc: 'Active community involvement and feedback',
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 10H9m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  gradient: 'from-purple-500 to-purple-600'
                },
                { 
                  title: 'Sustainability', 
                  desc: 'Long-term growth and environmental care',
                  icon: (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  gradient: 'from-amber-500 to-amber-600'
                }
              ].map((value, idx) => (
                <div 
                  key={idx} 
                  className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300 p-8 animate-fade-in-up"
                  style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
                >
                  <div className="relative z-10">
                    {/* Icon Container */}
                    <div className={`w-14 h-14 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {value.icon}
                    </div>
                    
                    {/* Content */}
                    <h4 className="font-black text-gray-900 mb-3 text-lg">{value.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">{value.desc}</p>
                  </div>
                  
                  {/* Hover Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
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
          <div className="text-center mb-16 md:mb-20 animate-fade-in-down">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
              <span className="text-blue-600 font-semibold text-sm">OUR SERVICES</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 animate-fade-in-down leading-tight" style={{ animationDelay: '0.1s' }}>
              Services We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Provide</span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto animate-fade-in-down font-medium" style={{ animationDelay: '0.2s' }}>
              Dedicated to maintaining the highest standards of civic management and infrastructure.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 animate-slide-up hover:border-blue-400 text-left"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <div className="relative h-40 bg-gradient-to-br overflow-hidden" style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }}>
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <span className="text-white font-bold mb-3 ml-4 text-sm">Click to See Details →</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
            {/* Close Button */}
            <div className="sticky top-0 flex justify-between items-center p-6 md:p-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white border-b border-gray-700 z-10">
              <h2 className="text-2xl md:text-3xl font-bold">{selectedService.title}</h2>
              <button
                onClick={() => setSelectedService(null)}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 md:p-8">
              {/* Service Image */}
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8 shadow-lg">
                <img 
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Service Description */}
              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">About This Service</h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {selectedService.fullDescription}
                </p>
              </div>

              {/* Service Details */}
              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">What We Include</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedService.services.map((item, idx) => (
                    <div key={idx} className="flex items-start p-4 bg-blue-50 rounded-xl border border-blue-200 hover:border-blue-400 transition-colors">
                      <span className="text-blue-600 font-bold mr-3 mt-0.5 text-lg">✓</span>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleFileComplaint(selectedService.category);
                  }}
                  disabled={isCheckingAuth}
                  className="flex-1 px-6 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg"
                >
                  {isCheckingAuth ? 'Processing...' : `File a Complaint for ${selectedService.category}`}
                </button>
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-3 md:py-4 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold rounded-xl transition-all duration-300 text-base md:text-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How It Works Section */}
      <section id="complaint" className="py-20 md:py-32 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20 animate-fade-in-down">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
              <span className="text-blue-600 font-semibold text-sm">SIMPLE PROCESS</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 animate-fade-in-down leading-tight" style={{ animationDelay: '0.1s' }}>
              How to File a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Complaint</span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto animate-fade-in-down font-medium" style={{ animationDelay: '0.2s' }}>
              Just 4 simple steps to report issues and track their resolution in real-time. Quick, secure, and transparent.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-4 gap-6 md:gap-4 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-purple-400 rounded-full"></div>

            {/* Step 1 */}
            <div className="relative text-center group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex flex-col h-full">
                {/* Step Number Circle */}
                <div className="relative inline-flex items-center justify-center mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 text-white w-20 h-20 rounded-full flex items-center justify-center font-black text-3xl group-hover:scale-110 transition-transform duration-300 shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-500/40 border-4 border-white">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="font-black text-gray-900 mb-3 text-xl tracking-tight">Create Account</h3>
                <p className="text-gray-600 flex-grow text-base leading-relaxed font-medium">
                  Register using your email or phone to access the system securely and get started.
                </p>
                <div className="mt-6">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Step 1</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative text-center group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col h-full">
                {/* Step Number Circle */}
                <div className="relative inline-flex items-center justify-center mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-green-500 to-green-700 text-white w-20 h-20 rounded-full flex items-center justify-center font-black text-3xl group-hover:scale-110 transition-transform duration-300 shadow-xl group-hover:shadow-2xl group-hover:shadow-green-500/40 border-4 border-white">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                <h3 className="font-black text-gray-900 mb-3 text-xl tracking-tight">File Complaint</h3>
                <p className="text-gray-600 flex-grow text-base leading-relaxed font-medium">
                  Submit your detailed complaint with description, images, and exact location details.
                </p>
                <div className="mt-6">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Step 2</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative text-center group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col h-full">
                {/* Step Number Circle */}
                <div className="relative inline-flex items-center justify-center mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-yellow-500 to-yellow-700 text-white w-20 h-20 rounded-full flex items-center justify-center font-black text-3xl group-hover:scale-110 transition-transform duration-300 shadow-xl group-hover:shadow-2xl group-hover:shadow-yellow-500/40 border-4 border-white">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>

                <h3 className="font-black text-gray-900 mb-3 text-xl tracking-tight">Track Progress</h3>
                <p className="text-gray-600 flex-grow text-base leading-relaxed font-medium">
                  Monitor real-time status updates and receive instant notifications on your complaint.
                </p>
                <div className="mt-6">
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">Step 3</span>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative text-center group animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-col h-full">
                {/* Step Number Circle */}
                <div className="relative inline-flex items-center justify-center mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-purple-500 to-purple-700 text-white w-20 h-20 rounded-full flex items-center justify-center font-black text-3xl group-hover:scale-110 transition-transform duration-300 shadow-xl group-hover:shadow-2xl group-hover:shadow-purple-500/40 border-4 border-white">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                <h3 className="font-black text-gray-900 mb-3 text-xl tracking-tight">Get Resolution</h3>
                <p className="text-gray-600 flex-grow text-base leading-relaxed font-medium">
                  Receive confirmation and closure notification once your issue is properly addressed.
                </p>
                <div className="mt-6">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">Step 4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-20 md:mt-28 grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:shadow-blue-100 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-indigo-400/0 group-hover:from-blue-400/5 group-hover:to-indigo-400/5 rounded-2xl transition-all duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-black text-gray-900 mb-3 text-lg">Fast Processing</h4>
                <p className="text-gray-600 font-medium text-sm leading-relaxed">Average response time: <span className="text-blue-600 font-bold">24-48 hours</span></p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-xl hover:shadow-green-100 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-emerald-400/0 group-hover:from-green-400/5 group-hover:to-emerald-400/5 rounded-2xl transition-all duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="font-black text-gray-900 mb-3 text-lg">Secure & Confidential</h4>
                <p className="text-gray-600 font-medium text-sm leading-relaxed">Your information is <span className="text-green-600 font-bold">protected and secure</span></p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-xl hover:shadow-purple-100 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/5 group-hover:to-pink-400/5 rounded-2xl transition-all duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-black text-gray-900 mb-3 text-lg">24/7 Access</h4>
                <p className="text-gray-600 font-medium text-sm leading-relaxed">File complaints <span className="text-purple-600 font-bold">anytime, anywhere</span></p>
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
