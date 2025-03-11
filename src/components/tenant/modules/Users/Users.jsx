import React, { useState } from "react";
import SettingsLayout from "../../settings/Settings";

import Navbar from "../../../common/Navbar";
import UserList from "./UserList";






const Users = () => {

  const [activeTab,setActiveTab]=useState("users")
  const tabs =[
    {id:"users" ,label:"Users"},
    {id:"active", label:"Activate Users"}

  ]

  const renderitem = ()=>{
    switch(activeTab){
      case "users":
        return <UserList/>
      case "active":
        return null

    }
  }
  return (
    <SettingsLayout>
      <Navbar/>
      
      <div className="border-b rounded-2xl  border-gray-200  py-2 px-5">
            <div className='flex space-x-8'>
                {tabs.map(tab=>(
                    <button
                    key={tab.id}
                    onClick={()=>setActiveTab(tab.id)}className={`pb-4 relative transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-[#5c77fc] ${
                        activeTab === tab.id
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                > <span className='flex items-center font-bold'>{tab.label}</span>

                    </button>
                )

                )}

            </div>
            

        </div>
        <div className='p-4'>{renderitem()}</div>
      
    </SettingsLayout>
  );
};

export default Users;
