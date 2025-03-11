import React from 'react';
import Sidebar from './Slidebar';
import { Users, Sparkles, ShoppingBag, Briefcase, Search, Bell, Settings2Icon, Settings } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Navbar from '../../common/Navbar';
import { useSelector } from 'react-redux';





function Dashboard() {
  const role=useSelector((state)=>state.auth.role)
  const permission = useSelector((state) => state.auth.permissions);
  const sub = localStorage.getItem("subdomain")
  console.log("jasir",sub)
  const navigate = useNavigate();
  const stats = [
    { icon: Users, title: 'Active Leads', value: '178+', color: 'bg-blue-500' },
    { icon: Sparkles, title: 'Opportunities in Progress', value: '20+', color: 'bg-yellow-500' },
    { icon: ShoppingBag, title: 'Sales Products', value: '190+', color: 'bg-red-500' },
    { icon: Briefcase, title: 'Job Application', value: '12+', color: 'bg-purple-500' },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <div className="flex-1">
        {/* Header */}
        <Navbar/>

        {/* Main Content */}
        {/* <main className="p-6"> */}
          {/* Stats Grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div> */}

          {/* Charts Section
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Chart />
             */}
            {/* Opportunity Progress */}
            {/* <main className="p-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-6">Opportunity Progress</h2>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      80%
                    </span>
                  </div>
                </div>
                <div className="flex h-2 mb-4 overflow-hidden rounded bg-blue-200">
                  <div
                    style={{ width: "80%" }}
                    className="flex flex-col justify-center overflow-hidden bg-blue-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </main> */}
        <h1>welcome{sub}
          {role}
          {permission}
        </h1>
      </div>
    </div>
  );
}



export default Dashboard;