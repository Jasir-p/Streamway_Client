import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Plus, 
  Filter, 
  Search, 
  MoreHorizontal, 
  CheckCircle2, 
  XCircle,
  UserPlus,
  Briefcase
} from 'lucide-react';
import SettingsLayout from '../../settings/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { addTeam, fetchTeams } from '../../../../redux/slice/TeamSlice';
import { useForm } from 'react-hook-form';
import userprofile from "../../../../assets/user-profile.webp";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../common/Navbar';
import TeamForm from './TeamForm';
import { addRole } from '../../../../redux/slice/roleSlice';




const TeamManagement = () => {
  const {teams,loading,error}= useSelector((state)=>state.teams)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchTeams())
  },[dispatch])



  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [change,setChange] =useState(false)


  const filteredTeams = (teams || []).filter(team => 
    team?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team?.team_lead?.name?.toLowerCase().includes(searchTerm.toLowerCase())
);

  const onSubmit = (data) => {
    console.log(data)
    dispatch(addTeam({
    name: data.name, 
      description: data.description, 
      team_lead: parseInt(data.team_lead, 10), 
    }));
    dispatch(fetchTeams()); // Refresh roles after adding
    setIsModalOpen(false)
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'text-green-600 bg-green-50';
      case 'Scaling': return 'text-blue-600 bg-blue-50';
      case 'New': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

const handleClickView = (team_id)=>{
    setTimeout(()=>{
        navigate(`/setting/team/teams/${team_id}`)
    },500)

}

return (
    <SettingsLayout>
    <Navbar />
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          
          
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <input 
                type="text"
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>

            {/* Create Team Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="mr-2" /> Create Team
            </button>
          </div>
        </div>

        {/* Team Creation Modal */}
       
  
<TeamForm
    isOpen ={isModalOpen}
    onClose={()=>setIsModalOpen(false)}
    changes={() => setChange(prev => !prev)}
    onSubmit={onSubmit} />

        {/* Team List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
  <div 
    key={team.id} 
    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-3">
        <img 
          alt={team.team_lead ? team.team_lead.name : 'No Lead'} 
          src={userprofile}
          className="w-10 h-10 rounded-full border-2 border-blue-100"
          onClick={() => handleClickView(team.id)}
        />
        <div>
          <h3 className="font-bold text-gray-800">{team.name}</h3>
          <p className="text-sm text-gray-500">
            {team.team_lead && team.team_lead.name ? team.team_lead.name : 'No Lead Assigned'}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="text-gray-500 hover:text-blue-600">
          <MoreHorizontal />
        </button>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
      <div>
        <p className="text-xs text-gray-500">Members</p>
        <p className="font-semibold text-gray-700">{team.memberCount}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Projects</p>
        <p className="font-semibold text-gray-700">{team.activeProjects}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Created</p>
        <p className="font-semibold text-gray-700">
          {new Date(team.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>

    <div className="flex justify-between items-center">
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(team.status)}`}>
        {team.status}
      </span>
      <div className="flex space-x-2">
        <button className="text-green-500 hover:text-green-700" title="Add Members">
          <UserPlus size={18} />
        </button>
        <button className="text-blue-500 hover:text-blue-700" title="View Projects">
          <Briefcase size={18} />
        </button>
      </div>
    </div>
  </div>
))}
</div>

        {/* Empty State */}
        {filteredTeams.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Users className="mx-auto w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500">No teams found. Create your first team!</p>
          </div>
        )}
      </div>
    </div>
    </SettingsLayout>
  );

 
};

export default TeamManagement;