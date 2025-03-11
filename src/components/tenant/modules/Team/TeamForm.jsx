import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../../../redux/slice/UsersSlice";
import { useForm } from 'react-hook-form';


const TeamForm = ({isOpen, onClose,changes, onSubmit}) => {

const { users, loading, error } = useSelector((state) => state.users);
const dispatch = useDispatch();
useEffect(()=>{
    dispatch(fetchUsers());
},[])
const { register, handleSubmit, reset, formState: { errors } } = useForm();


      return (
     isOpen && (<div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">
      {/* Modal Header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-2">
        <h2 className="text-lg font-semibold">Add Team</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      {/* Modal Body */}
      <form onSubmit={handleSubmit((data) => {
                console.log("Form Data:", data);  // Debugging the form data
                onSubmit(data);
                reset();
              })} className="mt-4 space-y-4">
        {/* Team Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Team Name</label>
          <input
            id="teamName"
            {...register("name", { required: "Team Name is required" })}
            className="w-full border border-gray-300 rounded-2xl px-3 py-2 mt-1 focus:border-blue-300 focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter team name"
          />
          {errors.teamName && <div className="text-red-500 text-sm">{errors.teamName.message}</div>}
        </div>

        {/* Team Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Team Description</label>
          <textarea
            id="description"
            {...register("description")}
            className="w-full border border-gray-300 rounded-2xl px-3 py-2 mt-1 focus:border-blue-300 focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter team description"
          />
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Team Leader</label>
          <select
            {...register("team_lead", { required: "Team Leader is required" })}
            className="w-full border border-gray-300 rounded-2xl px-3 py-2 mt-1 focus:border-blue-300 focus:ring focus:ring-blue-300 focus:outline-none"
          >
            <option value="">Select a team leader</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>(
                  <p className="text-gray-600 text-sm">{user.role?.name || "No Role"}</p>)
                </div>
              </option>
            ))}
          </select>
          {errors.teamLeader && <div className="text-red-500 text-sm">{errors.teamLeader.message}</div>}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-end space-x-2">
          <button type="button" onClick={() => {
                    onClose();
                    reset();
                  }} className="px-4 py-2 border rounded-md bg-red-500 text-white hover:bg-red-600">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add Team
          </button>
        </div>
      </form>
    </div>
  </div>
     )
);

 
}

export default TeamForm
