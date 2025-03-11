import React, { useState } from 'react'
import { User, Edit, Mail, Phone, Shield, Briefcase,Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../../../redux/slice/UsersSlice';

const UserDetails = ({ users,changes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const renderDetailRow = (icon, label, value) => (
    <div className="flex items-center space-x-3 py-2 border-b border-gray-200 last:border-b-0">
      {icon}
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-600">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
  const handleDelete = () => {
    dispatch(deleteUser(users.id));
    changes()
    };
  



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
                <p className='text-xl font-bold text-gray-800'>{users.name}</p>
                <p className="text-sm text-gray-600">{users?.role?.name} 
                  
                </p>

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
              <p className='text-sm text-gray-700'>{users.email}</p>
            </div>
          </div>
        </div>
        <button
                  className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition ml-80 mt"
                  onClick={handleDelete}
                 
                >
                  <Trash2 size={18} className="mr-2" /> Delete
                </button>
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
            users.name
          )}
          
          {renderDetailRow(
            <Mail className='w-5 h-5 text-green-500' />, 
            'Email Address', 
            users.email
          )}
          
          {renderDetailRow(
            <Phone className='w-5 h-5 text-purple-500' />, 
            'Phone Number', 
            users.phone || 'Not provided'
          )}
          
          {renderDetailRow(
            <Shield className='w-5 h-5 text-red-500' />, 
            'Role', 
            users.role?.name
          )}
          
          {renderDetailRow(
            <Briefcase className='w-5 h-5 text-yellow-500' />, 
            'Department', 
            users.department || 'Not specified'
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
}

export default UserDetails;