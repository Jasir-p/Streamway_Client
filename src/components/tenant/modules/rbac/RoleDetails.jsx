import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SettingsLayout from "../../settings/Settings";
import axios from "axios";
import PermissionsSettings from "./Permission";
import Navbar from "../../../common/Navbar";
import UserTable from "./AssociatedUsers";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../../../../redux/slice/roleSlice";
import RoleModal from "./RoleUseform";
import { updateRole,deleteRole } from "../../../../redux/slice/roleSlice";


const fetchRoleById = async (role_id) => {
  const subdomain = localStorage.getItem("subdomain");
  const token = localStorage.getItem("access_token");

  try {
    const response = await axios.get(`http://${subdomain}.localhost:8000/role/`, {
      params: { role_id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("fetch", response.data);
    return response.data;
  } catch (error) {
    console.log("error fetching role", error.response?.data || error.message);
  }
};

const RoleDetails = () => {
  const { roles } = useSelector((state) => state.roles);
  const { role_id } = useParams();
  const [roleData, setRoleData] = useState(null);
  const [permission, setPermission] = useState(null);
  const [associatedUsers, setAssociatedUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Associate Users");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  
  const dispatch = useDispatch();

  const tabs = [
    { id: "Associate Users", label: "Associate Users" },
    { id: "Permission", label: "Permission" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Associate Users":
        return <UserTable users={associatedUsers} />;
      case "Permission":
        return <PermissionsSettings permission={permission} role_id={role_id} />;
      default:
        return <div>Select a valid tab</div>;
    }
  };

  useEffect(() => {
    const getRoleData = async () => {
      setLoading(true);
      const data = await fetchRoleById(role_id);
      setRoleData(data);
      setPermission(data.permission);
      setAssociatedUsers(data.employees);
      setLoading(false);
    };

    getRoleData();
  }, [role_id]);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleRoleSubmit = async(data)=>{
    dispatch(updateRole(data))
    const updatedRole = await fetchRoleById(role_id);
    setRoleData(updatedRole); 
    setShowModal(false)
  }
  const handleDelete =()=>{
    console.log(role_id)
    dispatch(deleteRole(role_id))
    navigate("/setting/security")
  }

  if (loading) return <div>Loading...</div>;
  console.log(roleData.roles)
  return (
    <SettingsLayout>
      <Navbar />
      <div className="max-w-full mx-auto px-6 py-2 bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Role Details</h2>

        <div className="space-y-5 text-lg text-gray-700 border-t border-gray-200 py-4">
          <div className="flex items-center">
            <p className="font-medium text-gray-900 w-60">Role Name:</p>
            <p>{roleData?.roles.name}</p>
          </div>

          <div className="flex items-center">
            <p className="font-medium text-gray-900 w-60">Share Data With Peers:</p>
            <p>{roleData?.roles.share ? "✔" : "✖"}</p>
          </div>

          <div className="flex items-center">
            <p className="font-medium text-gray-900 w-60">Description:</p>
            <p className="text-gray-500">{roleData?.roles.description}</p>
          </div>
        </div>

        <div className="flex px-44 gap-4 mb-6 py-15">
          <button
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
            onClick={() => {
             
              setShowModal(true);
            }}
          >
            Edit
          </button>
          <button
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
            onClick={() => navigate("/setting/security")}
          >
            Go to Role List
          </button>
          <button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300" onClick={handleDelete}>
            Delete
          </button>
        </div>

        <div className="border-b border-gray-200 mb-8">
          <div className="flex space-x-8 ml-50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 relative ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="flex items-center">
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Render Active Tab Content */}
        <div className="p-4">{renderTabContent()}</div>
      </div>

      {/* RoleModal component */}
      <RoleModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedRole(null); // Clear selected role when modal is closed
          setSelectedParentId(null); // Clear parent ID
        }}
        onSubmit={handleRoleSubmit} // Define the submit handler to handle form data
        defaultValues={
          roleData.roles
            ? { name: roleData.roles.name, description: roleData.roles.description, id: roleData.roles.id }
            : {}
        }
        parentRoleId={roleData.roles.parent_role}
        roles={roles}
      />
    </SettingsLayout>
  );
};

export default RoleDetails;
