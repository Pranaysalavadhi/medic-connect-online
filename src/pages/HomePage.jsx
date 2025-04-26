
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, FileText, UserCheck, ShieldCheck } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                Virtual Healthcare for <span className="text-primary">You</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Connect with licensed doctors, manage appointments, and access your health records from anywhere through our secure telemedicine platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 inline-flex items-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="lg:relative lg:h-96">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                alt="Doctor with tablet"
                className="rounded-lg shadow-xl object-cover object-center w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How HealthSync Works</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our platform makes healthcare accessible, convenient, and personalized for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Easy Scheduling</h3>
              <p className="text-gray-600">
                Book appointments with specialists in just a few clicks. Choose times that work for your schedule.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Virtual Consultations</h3>
              <p className="text-gray-600">
                Connect with healthcare professionals through secure video calls from the comfort of your home.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mb-4">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Health Records</h3>
              <p className="text-gray-600">
                Access and manage your medical records in one place. Share them securely with your healthcare providers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-lg text-gray-600">
              Hear from patients and doctors who use HealthSync
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 italic mb-4">
                "HealthSync has transformed how I manage my chronic condition. I can speak with my doctor whenever I need to without the hassle of traveling to the clinic."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                <div className="ml-3">
                  <h4 className="font-medium">Sarah Thompson</h4>
                  <p className="text-sm text-gray-500">Patient</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 italic mb-4">
                "As a doctor, HealthSync allows me to efficiently manage my appointments and provide care to patients who might otherwise struggle to visit my office."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                <div className="ml-3">
                  <h4 className="font-medium">Dr. Robert Chen</h4>
                  <p className="text-sm text-gray-500">Cardiologist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to take control of your healthcare?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of users who have made healthcare more accessible with HealthSync
          </p>
          <div className="flex justify-center">
            <Link
              to="/register"
              className="px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-gray-100 inline-flex items-center"
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">HealthSync</h3>
              <p className="text-gray-400">
                Connecting patients and doctors through secure telemedicine services.
              </p>
              <div className="flex items-center mt-4">
                <ShieldCheck className="h-5 w-5 mr-2 text-primary" />
                <span className="text-sm">HIPAA Compliant</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white">Virtual Consultations</Link></li>
                <li><Link to="#" className="hover:text-white">Health Records</Link></li>
                <li><Link to="#" className="hover:text-white">Prescription Refills</Link></li>
                <li><Link to="#" className="hover:text-white">Specialist Referrals</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white">About Us</Link></li>
                <li><Link to="#" className="hover:text-white">Careers</Link></li>
                <li><Link to="#" className="hover:text-white">Blog</Link></li>
                <li><Link to="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-white">Cookie Policy</Link></li>
                <li><Link to="#" className="hover:text-white">HIPAA Compliance</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} HealthSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
