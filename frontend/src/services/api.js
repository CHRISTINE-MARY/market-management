import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Interceptor to dynamically attach token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// // Add a request interceptor (optional)
// api.interceptors.request.use(
//     (config) => {
//         // Add authorization token if available
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // Add a response interceptor (optional)
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         // Handle errors globally
//         if (error.response && error.response.status === 401) {
//             // Handle unauthorized access (e.g., redirect to login)
//             console.error('Unauthorized, please log in again.');
//         }
//         return Promise.reject(error);
//     }
// );

export default API;
