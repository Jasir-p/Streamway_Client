import React, { useState } from 'react';
import { User, Edit, Mail, Phone, Shield, Globe, Calendar } from 'lucide-react';

const Personal = () => {
  const [isEditing, setIsEditing] = useState(false);

  const renderDetailRow = (icon, label, value) => (
    <div className="flex items-center space-x-3 py-2 border-b border-gray-200 last:border-b-0">
      {icon}
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-600">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className='bg-white rounded-xl shadow-md overflow-hidden max-w-md mx-auto'>
      {/* Profile Header */}
      <div className='relative bg-blue-50 p-6'>
        <div className='flex items-center space-x-4'>
          {/* Profile Icon */}
          <div className='w-20 h-20 flex-shrink-0 flex items-center justify-center bg-blue-200 rounded-full'>
            <User className='w-12 h-12 text-blue-500' />
          </div>
          
          {/* Personal Details */}
          <div className='flex-1'>
            <div className='flex items-center justify-between'>
              <div>
                <div className='flex items-center space-x-2'>
                  <p className='text-xl font-bold text-gray-800'>Jasir</p>
                  <span className='px-3 text-orange-600 border border-orange-600 bg-orange-100 text-xs font-semibold rounded-full whitespace-nowrap'>
                    Super Admin
                  </span>
                </div>
                <p className='text-sm text-gray-600'>CEO of ABC Company</p>
              </div>
              
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className='text-gray-500 hover:text-blue-600 transition-colors'
              >
                <Edit className='w-6 h-6' />
              </button>
            </div>
            
            <div className='flex items-center space-x-2 mt-2'>
              <Mail className='h-5 w-5 text-gray-500' />
              <p className='text-sm text-gray-700'>jasir@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Section */}
      <div className='px-6 py-4 bg-white'>
        <h2 className='text-md font-semibold text-gray-800 mb-4 border-b pb-2'>
          Personal Information
        </h2>
        
        <div className='space-y-3'>
          {renderDetailRow(
            <User className='w-5 h-5 text-blue-500' />, 
            'Full Name', 
            'Jasir'
          )}
          
          {renderDetailRow(
            <Mail className='w-5 h-5 text-green-500' />, 
            'Email Address', 
            'jasir@example.com'
          )}
          
          {renderDetailRow(
            <Phone className='w-5 h-5 text-purple-500' />, 
            'Phone Number', 
            '+123456789'
          )}
          
          {renderDetailRow(
            <Shield className='w-5 h-5 text-red-500' />, 
            'Role', 
            'Administrator'
          )}
          
          {renderDetailRow(
            <Globe className='w-5 h-5 text-yellow-500' />, 
            'Company', 
            'ABC Company'
          )}
          
          {renderDetailRow(
            <Calendar className='w-5 h-5 text-indigo-500' />, 
            'Joined Date', 
            'January 1, 2023'
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className='px-6 py-4 bg-gray-50 flex justify-end space-x-3'>
          <button 
            onClick={() => setIsEditing(false)}
            className='px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition'
          >
            Cancel
          </button>
          <button 
            className='px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition'
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default Personal;