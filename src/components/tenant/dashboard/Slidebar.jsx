import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  Sparkles,
  UserCircle,
  Calendar,
  Share2,
  PhoneCall,
  Mail,
  Settings,
  ChevronDown,
  PieChart,
  BarChart3,
  FileText,
  Search,
  Bell,
  HelpCircle
} from 'lucide-react';

function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [expandedSection, setExpandedSection] = useState("Main");

  const handleClick = (text) => {
    setActiveItem(text);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const menuSections = [
    {
      title: "Main",
      items: [
        { icon: LayoutDashboard, text: 'Dashboard' },
        { icon: PieChart, text: 'Analytics' }
      ]
    },
    {
      title: "Sales",
      items: [
        { icon: Users, text: 'Leads' },
        { icon: Sparkles, text: 'Opportunities' },
        { icon: BarChart3, text: 'Sales Pipeline' }
      ]
    },
    {
      title: "Customer",
      items: [
        { icon: UserCircle, text: 'Contacts' },
        { icon: Users, text: 'Accounts' },
        { icon: FileText, text: 'Contracts' }
      ]
    },
    {
      title: "Activities",
      items: [
        { icon: CheckSquare, text: 'Tasks' },
        { icon: Calendar, text: 'Meetings' },
        { icon: PhoneCall, text: 'Calls' },
        { icon: Mail, text: 'Emails' }
      ]
    },
    {
      title: "Teamwork",
      items: [
        { icon: Share2, text: 'Collaboration' }
      ]
    }
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-indigo-900 via-blue-800 to-blue-700 flex flex-col shadow-lg">
      {/* Logo */}
      <div className="p-4 border-b border-blue-600/30 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-yellow-400" />
          <span className="text-lg font-semibold text-white">StreamWay</span>
        </div>
        <div className="flex space-x-1">
          <button className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white">
            <Search className="h-4 w-4" />
          </button>
          <button className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="px-4 py-3 bg-blue-800/30 border-b border-blue-600/30">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/10 backdrop-blur-sm p-2 rounded-md border border-white/20">
            <p className="text-xs text-blue-100">New Leads</p>
            <p className="text-lg font-semibold text-white">24</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-2 rounded-md border border-white/20">
            <p className="text-xs text-blue-100">Open Tasks</p>
            <p className="text-lg font-semibold text-white">7</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {menuSections.map((section) => (
          <div key={section.title} className="mb-2">
            <button 
              className="w-full flex items-center justify-between p-2 text-xs font-medium text-blue-100 hover:text-white"
              onClick={() => toggleSection(section.title)}
            >
              <span>{section.title}</span>
              <ChevronDown 
                className={`h-3 w-3 transition-transform ${
                  expandedSection === section.title ? 'transform rotate-180' : ''
                }`} 
              />
            </button>
            
            {expandedSection === section.title && (
              <ul className="mt-1 space-y-1">
                {section.items.map((item) => (
                  <li key={item.text}>
                    <a
                      href="#"
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        activeItem === item.text
                          ? 'bg-white/20 backdrop-blur-sm text-white font-medium border-l-2 border-yellow-400'
                          : 'text-blue-100 hover:bg-white/10 hover:text-white'
                      }`}
                      onClick={() => handleClick(item.text)}
                    >
                      <item.icon className={`h-4 w-4 ${
                        activeItem === item.text ? 'text-yellow-400' : 'text-blue-200'
                      }`} />
                      <span>{item.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>

      {/* User profile */}
      <div className="p-3 border-t border-blue-600/30 bg-blue-800/40 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src="/api/placeholder/40/40"
              alt="Profile"
              className="w-8 h-8 rounded-full border border-white/30"
            />
            <span className="absolute bottom-0 right-0 h-2 w-2 bg-green-400 rounded-full border border-blue-800"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-blue-200 truncate">Sales Manager</p>
          </div>
          <div className="flex space-x-1">
            <button className="p-1 rounded-full hover:bg-white/10 text-blue-200 hover:text-white">
              <Settings className="h-4 w-4" />
            </button>
            <button className="p-1 rounded-full hover:bg-white/10 text-blue-200 hover:text-white">
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;