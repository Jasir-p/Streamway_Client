import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../../../redux/slice/UsersSlice";
import userprofile from "../../../../assets/user-profile.webp";
import AddUserModal from "./UserForm";
import { ChevronDown, UserPlus, UserX, Trash2, RefreshCw } from "lucide-react";
import UserDetails from "./UserDetails";
import axios from "axios";


function UserList() {
  const dispatch = useDispatch();



  const { users, loading, error } = useSelector((state) => state.users);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [change,setChange]=useState(false)

  const options = [
    { value: "active", label: "Active Users", action: () => setIsActive(true) },
    { value: "inactive", label: "Inactive Users", action: () => setIsActive(false) },
    { value: "all", label: "All Users", action: () => setIsActive(null) },
  ];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch,change]);
  const handleClick = (user) => {
    setSelected(user);
    
  };

  const handleUserClick = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const filteredUsers = users.filter((user) =>
    isActive === null ? true : user.is_active === isActive
  );

  const handleBulkAction = async() => {
    const data ={"user_ids":selectedUsers}
    console.log(data)
    const token = localStorage.getItem("access_token");
    const subdomain = localStorage.getItem("subdomain");
    const response = await axios.post(`http://${subdomain}.localhost:8000/useraccess/`, data, {
      headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
  });
  console.log(response.data)
  setSelectedUsers([])
  setChange(!change)
  
    
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 h-screen border-r-2 border-gray-300 bg-white shadow overflow-auto">
        <div className="sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center mb-4 p-2">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
              >
                {options.find((opt) => 
                  isActive === null ? opt.value === "all" : 
                  opt.value === (isActive ? "active" : "inactive")
                )?.label}{" "}
                ({filteredUsers.length}) 
                <ChevronDown size={18} className="text-gray-500 ml-2" />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  {options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        option.action();
                        setIsDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedUsers.length === 0 ? (
              <button
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                onClick={() => setModalOpen(true)}
              >
                <UserPlus size={18} className="mr-2" /> New User
              </button>
            ) : (
              <div className="flex space-x-2">
                {isActive && (
                  <button
                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    onClick={handleBulkAction}
                  >
                    <UserX size={18} className="mr-2" /> Deactivate
                  </button>
                )}
                {!isActive && (
                  <button
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    onClick={handleBulkAction}
                  >
                    <RefreshCw size={18} className="mr-2" /> Activate
                  </button>
                )}
                
              </div>
            )}
          </div>

          <div className="relative mb-4 px-2">
            <input
              type="text"
              placeholder="Search users"
              className="w-full p-2 pl-10 border-b-2 border-gray-300 focus:border-blue-400 focus:outline-none"
            />
            <span className="absolute left-3 top-2 text-gray-400">🔍</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-4 text-gray-500">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No users found</div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`flex items-center p-2 hover:bg-gray-200 cursor-pointer ${
                selectedUsers.includes(user.id) ? "bg-gray-300" : ""
              }`}
            >
              <input
                type="checkbox"
                className="mr-3 w-4 h-4"
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleUserClick(user.id)}
              />
              <div 
                className="flex items-center w-full" 
                onClick={() => handleClick(user)}
              >
                <img
                  src={userprofile || "default-avatar.png"}
                  alt="User Avatar"
                  className="w-12 h-12 mr-3 rounded-full object-cover border-2 border-amber-300"
                />
                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-gray-600 text-sm">{user.role?.name || "No Role"}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-white flex-1 p-4 overflow-auto">
        {selected ? (
          <UserDetails users={selected} changes={() => setChange(prev => !prev)} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Click a user to see details
          </div>
        )}
      </div>

      <AddUserModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)}
        changes={() => setChange(prev => !prev)}
        
      />
    </div>
  );
}

export default UserList;