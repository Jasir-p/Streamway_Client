import { useEffect } from "react";
import { useForm } from "react-hook-form";


const RoleModal = ({ isOpen, onClose, onSubmit, defaultValues = {}, parentRoleId, roles }) => {
    const {
      register,
      handleSubmit,
      reset,
      setValue,  // Set value to prepopulate form
      formState: { errors },
    } = useForm({
      defaultValues: defaultValues, // Prepopulate values for editing
    });
  
    // Set parent role ID in form when modal opens
    useEffect(() => {
      if (parentRoleId) {
        setValue("parent_role", parentRoleId); // Pre-populate parent role if available
      }
    }, [parentRoleId, setValue]);
  
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
    console.log(parentRoleId)
    return (
      isOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {defaultValues.id ? "Edit Role" : parentRoleId ? "Add Subrole" : "Create New Role"}
            </h3>
  
            <form
              onSubmit={handleSubmit((data) => {
                console.log("Form Data:", data);  // Debugging the form data
                onSubmit(data);
                reset();
              })}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                <input
                  {...register("name", { required: "Role name is required" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter role name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter role description"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>
  
              {!parentRoleId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Role (Optional)</label>
                  <select
                    {...register("parent_role")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">No Parent (Root Role)</option>
                    {getAllRoles(roles).map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name} (Level {role.level})
                      </option>
                    ))}
                  </select>
                </div>
              )}
  
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    reset();
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  {defaultValues.id ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    );
  };
  
  export default RoleModal;
  
