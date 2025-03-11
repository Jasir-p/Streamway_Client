import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SubdomainProvider, useSubdomain } from "./Subdomain";
import LandingPage from "./pages/tenant/LandingPage";
import LoginPage from "./pages/tenant/auth/LoginPage";
import OtpPage from "./pages/tenant/auth/OtpPage";
import Dashboard from "./components/tenant/dashboard/Dashbord";
import Login from "./components/employee/Login";
import LoginEmoloye from "./pages/tenant/auth/LoginEmoloye";
import Sidebar from "./components/tenant/dashboard/Slidebar";
import RoleForm from "./components/tenant/modules/rbac/RoleList";
import SettingSidebar from "./components/tenant/settings/SettingSidebar";
import SettingsLayout from "./components/tenant/settings/Settings";
import Security from "./components/tenant/settings/Security";
import ProtectedRoute from "./components/tenant/routes/ProtectRoute";
import RoleDetails from "./components/tenant/modules/rbac/RoleDetails";
import Users from "./components/tenant/modules/Users/Users";
import Genaral from "./components/tenant/settings/Genaral";
import TeamManagement from "./components/tenant/modules/Team/TeamView";
import TeamDetailView from "./components/tenant/modules/Team/TeamDetailView";
import ToastProvider from "./components/common/ToastNotification";
import FormBuilder from "./components/tenant/modules/LeadForm/LeadForm";



// ✅ Separate ProtectedRoute for better structure


function App() {
  return (
    <SubdomainProvider>
      <ToastProvider> {/* ✅ Context Provider Wraps All Routes */}
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/signin" element={<LoginEmoloye />} />
        

        {/* ✅ Protected Dashboard Route */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
  
         
          <Route path="/setting" element={<ProtectedRoute><SettingsLayout/></ProtectedRoute>}/>
          <Route path="/setting/security" element={<ProtectedRoute><Security/></ProtectedRoute>}/>
          <Route path ="/setting/security/role/:role_id/" element={<ProtectedRoute><RoleDetails/></ProtectedRoute>}/>
          <Route path="/setting/users" element={<ProtectedRoute><Users/></ProtectedRoute>}/>
          <Route path="/setting/genaral" element={<ProtectedRoute><Genaral/></ProtectedRoute>}/>
          <Route path="/setting/team" element={<ProtectedRoute><TeamManagement/></ProtectedRoute>}/>
          <Route path ="/setting/team/teams/:team_id/" element={<ProtectedRoute><TeamDetailView/></ProtectedRoute>}/>
          <Route path="/setting/lead_form" element={<ProtectedRoute><FormBuilder/></ProtectedRoute>}/>
          

        {/*  Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </ToastProvider>
    </SubdomainProvider>
  );
}

export default App;
