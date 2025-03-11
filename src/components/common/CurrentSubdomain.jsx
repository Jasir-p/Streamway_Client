import { useState, useEffect } from "react";

const useSubdomain = () => {
  const [subdomain, setSubdomain] = useState(null);

  useEffect(() => {
    const getSubdomain = () => {
      const host = window.location.hostname; // e.g., "tenant1.example.com"
      const parts = host.split(".");

      if (parts.length > 2) {
        return parts[0]; // Extracts "tenant1"
      }

      return null; // No subdomain found
    };

    setSubdomain(getSubdomain());
  }, []);

  return subdomain;
};

export default useSubdomain;
