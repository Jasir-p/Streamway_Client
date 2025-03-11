import React, { useState } from 'react';
import SettingsLayout from './Settings';
import RoleForm from '../modules/rbac/RoleList';
import RolesManagement from '../modules/rbac/Role';
import Navbar from '../../common/Navbar';
import LoadingScreen from '../../common/Loading';


// Components for each tab
const RoleList = () => <div>Role List Content</div>;
const WorkSchedule = () => <div>Work Schedule Content</div>;

const Security = () => {
    const [activeTab, setActiveTab] = useState("Hyrachie");

    const tabs = [
        { id: 'Hyrachie', label: 'Role Hierarchy' },
        { id: 'list', label: 'Role List' },
        { id: 'schedule', label: 'Work Schedule', isBeta: true }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Hyrachie':
                return <RoleForm />;
            case 'list':
                return <RoleList />;
            case 'schedule':
                return <WorkSchedule />;
            default:
                return <div>Select a valid tab</div>;
        }
    };

    return (
        <SettingsLayout>
            <Navbar />
            {/* Tabs Navigation */}
            <div className="border-b rounded-2xl border-gray-200 mb-8 py-10 px-5">
                <div className="flex space-x-8">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 relative transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-[#5c77fc] ${
                                activeTab === tab.id
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <span className="flex items-center font-bold">
                                {tab.label}
                                {tab.isBeta && (
                                    <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded">
                                        Beta
                                    </span>
                                )}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Render Active Tab Content */}
            <div className="p-4">{renderTabContent()}</div>
        </SettingsLayout>
    );
};

export default Security;
