import { useState } from "react";
import RoleNode from "./RoleNode"; // Import RoleNode
import RoleForm from "./RoleList"; // Import RoleForm

const RolesManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState(null);
  
  // Dummy role data (Replace with API response)
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", level: 0, children: [
        { id: 2, name: "Manager", level: 1, children: [] }
    ] },
  ]);

  // Function to add a new role
  const handleAddRole = (role) => {
    if (role.parentId) {
      const updateRoles = (rolesList) => {
        return rolesList.map((r) => {
          if (r.id === role.parentId) {
            return { ...r, children: [...r.children, role] };
          } else if (r.children.length > 0) {
            return { ...r, children: updateRoles(r.children) };
          }
          return r;
        });
      };
      setRoles(updateRoles(roles));
    } else {
      setRoles([...roles, role]); // Add top-level role
    }
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold">Roles Management</h2>
      
      {/* Add Root Role Button */}
      <button 
        onClick={() => { setSelectedParentId(null); setShowModal(true); }} 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Add Role
      </button>

      {/* Role Tree Structure */}
      <div className="mt-6">
        {roles.map((role) => (
          <RoleNode 
            key={role.id} 
            role={role} 
            onAddSubrole={(parentId) => { 
              setSelectedParentId(parentId); 
              setShowModal(true); 
            }} 
          />
        ))}
      </div>

      {/* Role Form Modal */}
      {showModal && (
        <RoleForm 
          setShowModal={setShowModal} 
          selectedParentId={selectedParentId} 
          onAddRole={handleAddRole} 
        />
      )}
    </div>
  );
};

export default RolesManagement;
