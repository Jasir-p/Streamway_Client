import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchRoles } from "../../../../redux/slice/roleSlice";

import { addUsers } from "../../../../redux/slice/UsersSlice";




export default function AddUserModal({ isOpen, onClose,changes }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  
  // Fetch roles only if not available in state
  useEffect(() => {
    if (roles.length === 0) {
      dispatch(fetchRoles());
    }
  }, [dispatch]); 

  const { roles } = useSelector((state) => state.roles);

  // Function to flatten hierarchical roles
  const getAllRoles = (roles) => {
    let result = [];
    roles.forEach((role) => {
      result.push({ id: role.id, name: role.name, level: role.level });
      if (role.children?.length > 0) {
        result = result.concat(getAllRoles(role.children));
      }
    });
    return result;
  };

  // Use useMemo to prevent re-renders
  const allRoles = useMemo(() => getAllRoles(roles), [roles]);

  console.log(allRoles);

  const onSubmit =  (data) => {
    try {
      
      dispatch(addUsers(data));
       // Close modal after success
      changes()
      onClose();
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
          <h2 className="text-lg font-semibold">Add User</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-gray-300 rounded-2xl px-3 py-2 mt-1 focus:border-blue-300 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter name"
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full border border-gray-300 rounded-2xl px-3 py-2 mt-1 focus:border-blue-300 focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter email"
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full border border-gray-300 rounded-2xl px-3 py-2 mt-1 focus:border-blue-300 focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option value="">Select a role</option>
              {allRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role && <div className="text-red-500 text-sm">{errors.role.message}</div>}
          </div>

          {/* Modal Footer */}
          <div className="mt-6 flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md bg-red-500 text-white hover:bg-red-600">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
