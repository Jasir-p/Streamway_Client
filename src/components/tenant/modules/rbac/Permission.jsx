import { useEffect, useState, useMemo } from "react";
import { Switch } from "@headlessui/react";
import { ChevronDown, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchPermission } from "../../../../redux/slice/PermissionSlice";
import axios from "axios";

const roleAcess = async (role, perm_id) => {
  const subdomain = localStorage.getItem("subdomain");
  const token = localStorage.getItem("access_token");

  const data = {
    role: role,
    Permission: perm_id,
  };

  try {
    const response = await axios.post(
      `http://${subdomain}.localhost:8000/roleacess/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching role", error.response?.data || error.message);
  }
};

const roleAcessDelete = async (role, perm_id) => {
  const subdomain = localStorage.getItem("subdomain");
  const token = localStorage.getItem("access_token");

  const data = {
    role: role,
    Permission: perm_id,
  };

  try {
    const response = await axios.delete(
      `http://${subdomain}.localhost:8000/roleacess/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data,
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching role", error.response?.data || error.message);
  }
};

export default function PermissionsTable({ permission, role_id }) {
  const dispatch = useDispatch();
  const { permissions } = useSelector((state) => state.permission);

  useEffect(() => {
    dispatch(fetchPermission());
  }, [dispatch]);

  const rolebased = useMemo(() => {
    if (!permission) return {};
    return permission.reduce((acc, item) => {
      const moduleName = item.Permission.module;
      if (!acc[moduleName]) {
        acc[moduleName] = [];
      }
      acc[moduleName].push({
        id: item.Permission.id,
        name: item.Permission.name,
        code_name: item.Permission.code_name,
      });
      return acc;
    }, {});
  }, [permission]);

  const groupedPermissions = useMemo(() => {
    return permissions.reduce((acc, item) => {
      const moduleName = item.module;
      if (!acc[moduleName]) {
        acc[moduleName] = [];
      }
      acc[moduleName].push({
        id: item.id,
        name: item.name,
        code_name: item.code_name,
      });
      return acc;
    }, {});
  }, [permissions]);

  const [enabledPermissions, setEnabledPermissions] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState({});

  useEffect(() => {
    if (permissions.length > 0) {
      const initialEnabled = {};
      const initialSelected = {};
      Object.keys(groupedPermissions).forEach((module) => {
        const moduleExists = rolebased && rolebased[module] ? true : false;
        initialEnabled[module] = moduleExists;
        initialSelected[module] = {};
        groupedPermissions[module].forEach((perm) => {
          const permissionExist =
            rolebased &&
            rolebased[module] &&
            rolebased[module].some((p) => p.name === perm.name);
          initialSelected[module][perm.name] = permissionExist;
        });
      });
      setEnabledPermissions(initialEnabled);
      setSelectedPermissions(initialSelected);
    }
  }, [permissions]);

  const togglePermission = (module, permission, perm_id) => {
    setSelectedPermissions((prev) => {
      const newStatus = !prev[module][permission];
      if (newStatus) {
        roleAcess(role_id, perm_id);
      } else {
        roleAcessDelete(role_id, perm_id);
      }
      return {
        ...prev,
        [module]: {
          ...prev[module],
          [permission]: newStatus,
        },
      };
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-full">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        Basic Permissions
      </h2>
      <div className="space-y-1">
        {Object.keys(groupedPermissions).map((module) => (
          <div key={module} className="relative">
            <div
              className="flex items-center justify-between p-2 hover:bg-gray-100 transition rounded-md"
            >
              <div className="flex items-center space-x-2">
                {enabledPermissions[module] ? (
                  <Check className="text-green-500" size={20} />
                ) : (
                  <X className="text-red-500" size={20} />
                )}
                <span className="text-sm font-bold text-gray-800">
                  {module}
                </span>
                
              </div>
              
              <div className="flex items-center space-x-2">
              {rolebased[module] &&
              (
                <span className="text-gray-600 text-xs">
               
                {rolebased[module].map((perm) => perm.name).join(", ")}
              </span>
              )}
              
                <Switch
                  checked={enabledPermissions[module]}
                  onChange={() =>
                    setEnabledPermissions((prev) => ({
                      ...prev,
                      [module]: !prev[module],
                    }))
                  }
                  className={`${
                    enabledPermissions[module] ? "bg-green-500" : "bg-gray-300"
                  } relative inline-flex h-4 w-8 items-center rounded-full transition`}
                >
                  <span
                    className={`${
                      enabledPermissions[module]
                        ? "translate-x-4"
                        : "translate-x-1"
                    } inline-block h-3 w-3 transform rounded-full bg-white transition`}
                  />
                  
                </Switch>
                <motion.div
                  className="cursor-pointer"
                  animate={{ rotate: openDropdown === module ? 180 : 0 }}
                  onClick={() =>
                    setOpenDropdown(openDropdown === module ? null : module)
                  }
                >
                  <ChevronDown size={18} className="text-gray-500" />
                </motion.div>
              </div>
            </div>

            {/* Dropdown - Ensure it's positioned correctly */}
            <AnimatePresence>
              {openDropdown === module && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 mt-2 bg-white shadow-md border border-gray-200 rounded-md p-2 w-40 z-10"
                >
                  <div className="flex justify-end">
                    <X
                      className="text-gray-500 cursor-pointer"
                      size={18}
                      onClick={() => setOpenDropdown(null)}
                    />
                  </div>
                  <ul className="text-gray-700 text-xs space-y-1">
                    {groupedPermissions[module].map((perm) => (
                      <li key={perm.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedPermissions[module][perm.name]}
                          onChange={() =>
                            togglePermission(module, perm.name, perm.id)
                          }
                          className="w-4 h-4 text-blue-500 border-gray-300 rounded"
                        />
                        <span>{perm.name}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
