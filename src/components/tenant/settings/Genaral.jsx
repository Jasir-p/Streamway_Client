import React, { useState } from 'react'
import SettingsLayout from './Settings'
import Navbar from '../../common/Navbar'
import Personal from '../modules/Genaral/Personal'
import Company from '../modules/Genaral/company'





const Genaral = () => {
    const [activeTab,setActiveTab] = useState("personal")

    const tabs =[
        {id:"personal" ,label:"Personal Settings"},
        {id:"company" , label:"Company Settings"}
    ]

    const renderTabContent=()=>{
        switch(activeTab){
           case"personal" :
           return <Personal/>
           case "company":
            return <Company/>
        }
    }
  return (
    <div>
      <SettingsLayout>
        <Navbar/>
        <div className="border-b rounded-2xl border-gray-200 bg-blue-50  py-2 px-5">
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
        <div className='p-4'>{renderTabContent()}</div>
      </SettingsLayout>
    </div>
  )
}

export default Genaral
