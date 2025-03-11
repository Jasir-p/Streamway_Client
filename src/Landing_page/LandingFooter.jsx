import React, { useState } from 'react';



const LandingFooter = () => {
  return (
    <div>
      
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300">Features</a></li>
                <li><a href="#" className="hover:text-blue-300">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-300">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300">About</a></li>
                <li><a href="#" className="hover:text-blue-300">Careers</a></li>
                <li><a href="#" className="hover:text-blue-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300">Blog</a></li>
                <li><a href="#" className="hover:text-blue-300">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-300">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-300">Terms</a></li>
                <li><a href="#" className="hover:text-blue-300">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 StreamWay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingFooter

