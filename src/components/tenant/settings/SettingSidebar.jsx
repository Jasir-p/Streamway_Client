import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';
import { Settings, Users, Shield, Link2, CreditCard, BarChart2, Archive, Lock, Copy } from 'lucide-react';

function SettingSidebar() {
  const [isActive, setActive] = useState('general');
  
  const handleClick = (text) => {
    setActive(text);
  };
  
  const menuItems = [
    { id: 'general', icon: Settings, label: 'General', path: "/setting/genaral" },
    { id: 'customization', icon: LayoutGrid, label: 'Customization', path: "" },
    { id: 'users', icon: Users, label: 'Users', path: "/setting/users" },
    { id: 'security', icon: Shield, label: 'Security', path: '/setting/security' },
    { id: 'connections', icon: Link2, label: 'Connections', path: "" },
    { id: 'billing', icon: CreditCard, label: 'Billing', path: "" },
    { id: 'usage', icon: BarChart2, label: 'Usage Stats', path: "" },
    { id: 'cleanup', icon: Archive, label: 'Tidy Up', path: "" },
    { id: 'lead_form', icon: LayoutGrid, label: 'Lead Form', path: "/setting/lead_form" },
    { id: 'Team', icon: Lock, label: 'Team', path: "/setting/team" },
    { id: 'copier', icon: Copy, label: 'Cross Account Copier', path: "" }
  ];
  
  const sections = [
    { title: 'General', items: menuItems.slice(0, 4) },
    { title: 'Account', items: menuItems.slice(4, 7) },
    { title: 'Management', items: menuItems.slice(7) }
  ];

  return (
    <div className="sticky h-screen w-64 bg-gradient-to-b from-indigo-900 via-blue-800 to-blue-700 flex flex-col shadow-lg">
      <div className="p-4 border-b border-blue-600/30">
        <h1 className="text-lg font-semibold text-white flex items-center">
          <Settings className="h-5 w-5 mr-2 text-yellow-400" />
          Settings
        </h1>
      </div>

      <div className="space-y-4 p-3 flex-1 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            <div className="px-3 mb-2">
              <h2 className="text-xs font-medium text-blue-100 uppercase tracking-wider">
                {section.title}
              </h2>
            </div>

            <nav className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center px-3 py-2 text-sm rounded-md transition-all duration-150 ${
                    item.id === isActive
                      ? 'bg-white/20 backdrop-blur-sm text-white font-medium border-l-2 border-yellow-400'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={() => handleClick(item.id)}
                >
                  {React.createElement(item.icon, {
                    className: `h-4 w-4 mr-3 ${
                      item.id === isActive ? 'text-yellow-400' : 'text-blue-200'
                    }`,
                  })}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-blue-600/30 bg-blue-800/40 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-md p-2 w-full">
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
              <span className="text-xs text-blue-100">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingSidebar;