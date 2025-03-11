import axios from "axios";

const getApiBaseUrl = ()=>{
    const hostname = window.location.hostname;
    const parts= hostname.split(".")

    if (parts.length > 2){
        const subdomain = parts[0]
        console.log(subdomain)
        return import.meta.env.VITE_APP_API_SUBDOMAIN_URL.replace("{subdomain}",subdomain)
    }
    return import.meta.env.VITE_API_URL
}

const api= axios.create({baseURL:getApiBaseUrl()})

export default api