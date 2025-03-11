import React from 'react';
import { useForm } from 'react-hook-form';
import {
  User,
  Mail,
  Briefcase,
  Lock,
  ArrowRight
} from 'lucide-react';
import { setTenantEmail } from '../redux/slice/TenantEmailSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate()
  const onSubmit = async (data) => {
    console.log("Form submitted:", data);

    try {
      const response = await axios.post(
        `http://localhost:8000/action`, 
        
          data,
        
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        dispatch(setTenantEmail(data.email))
        navigate('/otp')


      }
    } catch (error) {
      console.error("Login API Error:", error.response?.data || error.message);
    }
  };
  

  return (
    <div>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Start Your Free Trial Today
              </h2>
              <p className="text-gray-600">
                No credit card required. Get started with CRMPro in minutes.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      {...register("owner_name", { required: "Name is required" })}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="John Doe"
                      aria-describedby="name-error"
                    />
                    {errors.name && (
                      <span id="name-error" className="text-red-500 text-sm">{errors.name.message}</span>
                    )}
                  </div>
                </div>

                {/* Business Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Business Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Enter a valid email address",
                        },
                      })}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="you@company.com"
                      aria-describedby="email-error"
                    />
                    {errors.email && (
                      <span id="email-error" className="text-red-500 text-sm">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="company"
                      {...register("name", { required: "Company Name is required" })}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Your Company"
                      aria-describedby="company-error"
                    />
                    {errors.company && (
                      <span id="company-error" className="text-red-500 text-sm">{errors.company.message}</span>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                    Contact
                  </label>
                  <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <span className="text-gray-500 text-sm">+91</span>
                  </div>
                    <input
                      type="tel"
                      id="contact"
                      {...register("contact", {
                        required: "Contact number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Enter a valid 10-digit number",
                        },
                      })}
                      className="block w-full pl-14 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="9876543210"
                      aria-describedby="contact-error"
                    />
                    {errors.contact && (
                      <span id="contact-error" className="text-red-500 text-sm">{errors.contact.message}</span>
                    )}
                  </div>
                </div>


                {/* Submit Button */}
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-600 text-center">
                By signing up, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegistrationForm;
