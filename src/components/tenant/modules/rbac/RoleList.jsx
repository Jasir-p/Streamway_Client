import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchRoles, addRole } from "../../../../redux/slice/roleSlice";
import { Users, UserPlus } from "lucide-react";
import RoleNode from "./RoleNode";
import RoleUseform from "./RoleUseform"; // Import the new modal component
import LoadingScreen from "../../../common/Loading";

const RoleForm = () => {
  const dispatch = useDispatch();
  const { roles, loading } = useSelector((state) => state.roles);
  const [showModal, setShowModal] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [change,setChnage] = useState(false)

  useEffect(() => {
    dispatch(fetchRoles());
  }, [change]);

  const handleAddRole = async(data) => {
    console.log(data)
    await dispatch(addRole({ 
      name: data.name, 
      description: data.description, 
      parent_role: data.parent_role 
    })).unwrap();
     // Refresh roles after adding
    setShowModal(false);
    setSelectedParentId(null);
    setChnage(true)
  };
console.log("roles check", roles)
  if (loading) return <LoadingScreen />;

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Roles</h2>
          </div>
          <h6 className="text-sm font-medium text-gray-500 mt-1 max-w-md">
            Define how you share data among users based on your organization's role hierarchy.
          </h6>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
        >
          <UserPlus className="h-4 w-4 mr-2" /> Add Role
        </button>
      </div>

      <div className="px-6 py-4 border-b">
        <div className="p-6 space-y-4">
          {roles.map((role, index) => (
            <RoleNode
              key={role.id || `role-${index}`}
              role={role}
              onAddSubrole={(parent_role) => {
                setSelectedParentId(parent_role);
                setShowModal(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* Role Modal Component */}
      <RoleUseform
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          
          setSelectedParentId(null);
        }}
        onSubmit={handleAddRole} 
       
        parentRoleId={selectedParentId}
        roles={roles}
        
      />
    </div>
  );
};

export default RoleForm;
