import React,{useState} from "react"
import SettingSidebar from "./SettingSidebar"
import Navbar from "../../common/Navbar";


const SettingsLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-white">
      
      {/* Sidebar */}
      <div className="w-1/5 sticky top-0 h-screen overflow-y-auto">
        <SettingSidebar />
      </div>
      

      {/* Main Content Area */}
      <div className="p-0 w-4/5 h-full overflow-y-auto ">
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;
