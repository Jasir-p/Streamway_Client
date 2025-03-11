import React, { useState } from "react";
import { ChevronDown, ChevronRight, Users, UserPlus } from "lucide-react";
import RoleDetails from "./RoleDetails";
import { useNavigate } from "react-router-dom";



const RoleNode = ({ role, onAddSubrole }) => {
  if (!role) return null; // Ensure role is defined
  const [showDetails,setShowDetails]= useState(false)
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = Array.isArray(role.children) && role.children.length > 0;
  console.log(role.level)

  const getLevelColor = (level) => {
    const colors = [
      "border-blue-600", "border-green-500", "border-orange-500", "border-red-500",
      "border-purple-500", "border-pink-500", "border-indigo-500", "border-cyan-500",
      "border-teal-500", "border-yellow-500", "border-lime-500", "border-emerald-500",
      "border-sky-500", "border-violet-500", "border-fuchsia-500"
    ];
    return colors[level % colors.length];
  };
  const navigate = useNavigate();

  const handleClick = () => {
    setShowDetails(true);
    setTimeout(() => {
      navigate(`/setting/security/role/${role.id}`);
    }, 500); // Delay navigation by 500ms (you can adjust this as needed)
  };
  return (
    <div className="relative">
      <div className="group flex items-center gap-2">
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        )}

        <div className="flex items-center gap-3 flex-1">
          <button onClick={handleClick}><div className={`flex items-center gap-2 px-4 py-2 rounded-md border-l-4 ${getLevelColor(role.level)} bg-white shadow-sm`}> 
            <Users className="h-4 w-4 text-gray-600" />
            <span className="font-medium text-gray-900">{role.name}</span>
          </div>
          </button>
          
          <button
            onClick={() => onAddSubrole(role.id)}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <UserPlus className="h-4 w-4" />
            Add Subrole
          </button>
        </div>
        
      </div>
      
      {isExpanded && hasChildren && (
        <div className="ml-6 pl-6 mt-2 relative">
          <div className="absolute left-0 top-0 h-full w-px bg-gray-200" />
          {role.children.map((child) => (
            <div key={child.id} className="relative">
              <div className="absolute left-0 top-1/2 w-6 h-px bg-gray-200" />
              <RoleNode role={child} onAddSubrole={onAddSubrole} />
            </div>
          ))}
        </div>
      )}


    </div>
  );
};

export default RoleNode;
