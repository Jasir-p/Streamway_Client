import { Navigate, useLocation } from "react-router-dom";
import { useSubdomain } from "../../../Subdomain";

const ProtectedRoute = ({ children }) => {
  const { isValid, isLoading } = useSubdomain();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state until authentication is checked
  }

  if (!isValid) {
     window.location.href = "http://localhost:5173/login";
  }
  console.log("helooooo")
  return children;
};

export default ProtectedRoute;
