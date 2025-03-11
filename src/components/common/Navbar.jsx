import React from 'react'
import { Users, Sparkles, ShoppingBag, Briefcase, Search, Bell, Settings2Icon, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Navbar = () => {
  const navigate=useNavigate()
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="flex justify-center py-4 bg-white "> {/* Centering the navbar */}
      <header className=" bg-blue-200 max-w-3xl w-full rounded-2xl shadow-md">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 flex-1 max-w-md">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 bg-transparent outline-none w-full"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-700 rounded-full">
              <Bell className="h-5 w-5 text-white" />
            </button>
            {role ==="owner"&&(<button className="p-2 hover:bg-gray-700 rounded-full" onClick={()=>navigate('/setting/genaral')}>
              <Settings className="h-5 w-5 text-white" />
            </button>)}
            
            <div className="h-8 w-px bg-gray-200" />
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
