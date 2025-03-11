import React, { useState } from "react";
import { BarChart3, Mail, Lock, ArrowRight } from "lucide-react";
import logo from "../../../assets/logo.png";
import { useForm } from "react-hook-form";
import useSubdomain from "../../common/CurrentSubdomain";
import axios from "axios"; // ✅ Import Axios
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { jwtDecode } from "jwt-decode"; // ✅ Use named import

function LoginForm() {
 // ✅ Fix variable name
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);

    try {
      const response = await axios.post(
        `http://localhost:8000/login/`, 
        {
          username: data.email, 
          password: data.password, 
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.access_token) {
        console.log("✅ Login Successful:", response.data);

        
        const decodedToken = jwtDecode(response.data.access_token);
        

        const subdomain = decodedToken.subdomain; 
        console.log(subdomain)
        

        
        window.location.href = `http://${subdomain}.localhost:5173/dashboard?access=${response.data.access_token}&refresh=${response.data.refresh_token}`;
      } else {
        console.log(" Login Failed:", response.data.message);
      }
    } catch (error) {
      console.error("Login API Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center mb-6">
            <img src={logo} className="h-16 w-34 center" alt="Logo" />
          </div>

          {/* Welcome Text */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to your account to continue managing your customer relationships.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email address",
                    },
                  })}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm"
                  placeholder="Enter your email"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password", { required: "Password is required" })}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm"
                  placeholder="Enter your password"
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Sign in
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up for free
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block relative flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-1.2.1&auto=format&fit=crop&q=80"
          alt="Office workspace with laptop and analytics"
        />
        {/* Overlay with testimonial */}
        <div className="absolute inset-0 bg-blue-600 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-blue-600/20" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <blockquote className="mt-6">
            <p className="text-xl font-medium text-white">
              "StreamWay has transformed how we manage our customer relationships."
            </p>
            <footer className="mt-6">
              <p className="text-base font-medium text-white">Nikhil Kilivayil</p>
              <p className="text-sm font-medium text-blue-100">CEO at BrotoType</p>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
