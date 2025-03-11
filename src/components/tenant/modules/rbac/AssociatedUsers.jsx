import React from "react";



const statusColors = {
  true: "bg-green-100 text-green-700",
  false: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const UserTable = ({users}) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border border-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700 font-semibold">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`border-b border-gray-200  ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${statusColors[user.is_active
                  ]}`}
                >
                  {user.is_active ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
