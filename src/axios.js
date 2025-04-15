import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: "https://spec-repo-origin.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    
  },
  
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },

  (error) => Promise.reject(error)
);


export default axiosInstance;