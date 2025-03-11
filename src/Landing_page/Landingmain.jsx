import React, { useState } from 'react';
import {
  BarChart3,
  Users,
  MessageSquare,
  Target,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  Building2,
  Lock,
  User,
  Briefcase
} from 'lucide-react';
import RegistrationForm from './RegistrationForm';
import LandingFooter from './LandingFooter';
import logo1 from ".././assets/logo1.png";




function Landingmain() {
 

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
             
              
              <img src={logo1} className="h-18 w-36
               text-blue" />
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-white hover:text-blue-200">Features</a>
              <a href="#pricing" className="text-white hover:text-blue-200">Pricing</a>
              <a href="#contact" className="text-white hover:text-blue-200">Contact</a>
            </div>
            <a href="#register" className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors">
              Try Free
            </a>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Transform Your Customer Relationships
              </h1>
              <p className="mt-4 text-xl text-blue-100">
                Streamline your sales process, boost productivity, and grow your business with our powerful CRM solution.
              </p>
              <div className="mt-8 flex space-x-4">
              <a href="#register" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors flex items-center">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80"
                alt="CRM Dashboard"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </header>
    <section id="register">
    <RegistrationForm/>
    </section>
     

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
            Everything you need to succeed
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <BarChart3 className="h-10 w-10 text-blue-600" />,
                title: "Sales Analytics",
                description: "Get real-time insights into your sales performance with advanced analytics and reporting."
              },
              {
                icon: <Users className="h-10 w-10 text-blue-600" />,
                title: "Contact Management",
                description: "Organize and manage your contacts efficiently with our intuitive interface."
              },
              {
                icon: <MessageSquare className="h-10 w-10 text-blue-600" />,
                title: "Communication Tools",
                description: "Stay connected with your team and customers through integrated communication features."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                {feature.icon}
                <h3 className="text-xl font-semibold mt-4 text-gray-800">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Why choose our CRM?
              </h2>
              <div className="space-y-4">
                {[
                  "360° view of your customers",
                  "Automated workflow processes",
                  "Advanced reporting capabilities",
                  "Seamless third-party integrations"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Ready to get started?
            </h2>
            <p className="text-gray-600 mb-8">
              Contact our team today and discover how we can help transform your business.
            </p>
            <div className="flex flex-col space-y-4">
              <a href="tel:+1234567890" className="flex items-center justify-center space-x-3 text-blue-600 hover:text-blue-700">
                <Phone className="h-5 w-5" />
                <span>+91 9995458196</span>
              </a>
              <a href="mailto:sales@crmpro.com" className="flex items-center justify-center space-x-3 text-blue-600 hover:text-blue-700">
                <Mail className="h-5 w-5" />
                <span>stream8196@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <LandingFooter/>
      
    </div>
  );
}

export default Landingmain;