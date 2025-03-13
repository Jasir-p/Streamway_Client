import { createContext, useContext, useEffect, useState, useMemo, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setEmployeeSubdomain } from "./redux/slice/EmployeeSlice";
import { setUserRoleAndPermissions } from "./redux/slice/authrizeSlice";

const SubdomainContext = createContext(null);
const PUBLIC_PATHS = new Set(["/", "/signup", "/otp", "/login"]);

export const SubdomainProvider = ({ children }) => {
  const [state, setState] = useState({
    subdomain: null,
    isLoading: true,
    isValid: false,
    tenantIdentified: false,
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const hasRun = useRef(false); 

  // Check if token is expired
  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp * 1000 < Date.now(); // Convert exp to milliseconds
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Assume expired if we can't decode it
    }
  };

  const refreshAccessToken = async (refreshToken, storedSubdomain) => {
    try {
      const response = await axios.post(`http://${storedSubdomain}.localhost:8000/api/token/refresh/`, {
        refresh: refreshToken,
      });

      const newAccessToken = response.data.access;
      localStorage.setItem("access_token", newAccessToken);
      console.log("Access token refreshed");

      // Get token data and update state if needed
      const decodedToken = jwtDecode(newAccessToken);
      const role = decodedToken.role;
      const permissions = decodedToken.permissions || [];
      dispatch(setUserRoleAndPermissions({ role, permissions }));

      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "http://localhost:5173/login";
      return null;
    }
  };

  useEffect(() => {
    if (hasRun.current) return; 
    hasRun.current = true; 

    const checkAuth = async () => {
      try {
        // Check for tokens in URL (login redirect)
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("access");
        const refreshToken = urlParams.get("refresh");

        if (accessToken && refreshToken) {
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);
          const decodedToken = jwtDecode(accessToken);
          const subdomain = decodedToken.subdomain;
          const role = decodedToken.role;
          const user_id = decodedToken.user_id;
          console.log(user_id)
          const permissions = decodedToken.permissions || [];
          dispatch(setUserRoleAndPermissions({ role, permissions }));
          localStorage.setItem("subdomain", subdomain);
          window.history.replaceState(null, null, window.location.pathname);
        }

        // Get stored tokens and subdomain
        let storedSubdomain = localStorage.getItem("subdomain");
        let token = localStorage.getItem("access_token");
        let storedRefreshToken = localStorage.getItem("refresh_token");
        console.log("stored",storedRefreshToken)

        // Check if we need to extract subdomain from hostname
        if (!storedSubdomain) {
          const hostname = window.location.hostname;
          const parts = hostname.split(".");
          if (parts.length > 1) {
            storedSubdomain = parts[0];
          }
        }

        // Handle public paths
        if (PUBLIC_PATHS.has(location.pathname)) {
          setState({ subdomain: null, isLoading: false, isValid: false, tenantIdentified: false });
          if (window.location.hostname !== "localhost") {
            window.location.href = `http://localhost:5173${location.pathname}`;
          }
          return;
        }

        // Redirect if no subdomain found
        if (!storedSubdomain) {
          console.log("No subdomain found. Redirecting to public login...");
          setState({ isLoading: false, isValid: false });
          window.location.href = "http://localhost:5173/login";
          return;
        }

        // Handle token refresh if token is missing or expired
        if ((!token || (token && isTokenExpired(token))) && storedRefreshToken) {
          console.log("Access token missing or expired. Trying to refresh...");
          token = await refreshAccessToken(storedRefreshToken, storedSubdomain);
        }

        // Special handling for signin path
        if (!token && location.pathname === "/signin") {
          try {
            const tenantResponse = await axios.get(`http://${storedSubdomain}.localhost:8000/api/`);
            if (!tenantResponse.data.status) {
              console.log("Invalid Tenant. Redirecting to home...");
              setState({ isLoading: false, isValid: false });
              navigate("/", { replace: true });
              return;
            } else {
              console.log("Valid Tenant. Redirecting to login...");
              setState({ isLoading: false, isValid: true });
              dispatch(setEmployeeSubdomain(storedSubdomain));
              navigate("/signin", { replace: true });
              return;
            }
          } catch (error) {
            console.error("Error checking tenant:", error);
            setState({ isLoading: false, isValid: false });
            navigate("/", { replace: true });
            return;
          }
        }

        // If we have no token and we're not on signin page, redirect to login
        if (!token && location.pathname !== "/signin") {
          console.log("No valid token. Redirecting to login...");
          setState({ isLoading: false, isValid: false });
          window.location.href = "http://localhost:5173/login";
          return;
        }

        // Verify authentication with the token
        try {
          const authResponse = await axios.get(`http://${storedSubdomain}.localhost:8000/api/`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (authResponse.data.status) {
            console.log("User Authenticated:", storedSubdomain);
            setState({
              subdomain: storedSubdomain,
              isLoading: false,
              isValid: true,
            });

            if (window.location.hostname !== `${storedSubdomain}.localhost`) {
              console.log("Redirecting to correct subdomain...");
              window.location.href = `http://${storedSubdomain}.localhost:5173/dashboard`;
            } else {
              console.log("Navigating inside subdomain...");
              navigate(location.pathname, { replace: true });
            }
          }
        } catch (error) {
          // Check if this is a 401 (unauthorized) error, which could indicate an expired token
          if (error.response && error.response.status === 401 && storedRefreshToken) {
            console.log("Authentication failed with 401. Attempting token refresh...");
            const newToken = await refreshAccessToken(storedRefreshToken, storedSubdomain);
            
            if (newToken) {
              // Retry the authentication with the new token
              try {
                const retryResponse = await axios.get(`http://${storedSubdomain}.localhost:8000/api/`, {
                  headers: { Authorization: `Bearer ${newToken}` },
                });
                
                if (retryResponse.data.status) {
                  console.log("User Authenticated after token refresh:", storedSubdomain);
                  setState({
                    subdomain: storedSubdomain,
                    isLoading: false,
                    isValid: true,
                  });
                  
                  if (window.location.hostname !== `${storedSubdomain}.localhost`) {
                    window.location.href = `http://${storedSubdomain}.localhost:5173/dashboard`;
                  } else {
                    navigate(location.pathname, { replace: true });
                  }
                  return;
                }
              } catch (retryError) {
                console.error("Authentication failed even after token refresh:", retryError);
                // Fall through to the logout code below
              }
            }
          }
          
          // If we get here, authentication failed completely
          console.error("Authentication Failed:", error);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setState({ isLoading: false, isValid: false });
          window.location.href = "http://localhost:5173/login";
        }
      } catch (error) {
        console.error("Unexpected error in checkAuth:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setState({ isLoading: false, isValid: false });
        window.location.href = "http://localhost:5173/login";
      }
    };

    checkAuth();
  }, [location.pathname]); 
  
  const contextValue = useMemo(() => state, [state.subdomain, state.isLoading, state.isValid]);

  return <SubdomainContext.Provider value={contextValue}>{children}</SubdomainContext.Provider>;
};

export const useSubdomain = () => {
  const context = useContext(SubdomainContext);
  if (!context) {
    throw new Error("useSubdomain must be used within SubdomainProvider");
  }
  return context;
};