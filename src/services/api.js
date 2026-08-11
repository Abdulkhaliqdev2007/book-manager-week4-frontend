import axios from 'axios';

const api = axios.create({

  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',

  headers: {
    'Content-Type': 'application/json',
  },

  timeout: 10000,

});


// Request interceptor - Attach JWT token
api.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

  },

  (error) => {
    return Promise.reject(error);
  }

);


// Response interceptor
api.interceptors.response.use(

  (response) => {

    return response;

  },


  (error) => {

    let message = "Something went wrong";


    if (error.response) {

      const data = error.response.data;


      message =
        data?.message ||
        data?.error ||
        `Error ${error.response.status}`;


      console.error(
        "API Error:",
        data
      );


    } else if (error.request) {


      message =
        "Cannot connect to server. Please check your internet connection.";


      console.error(
        "Network Error: No response from server"
      );


    } else {


      message = error.message;

    }


    error.message = message;


    return Promise.reject(error);

  }

);


export default api;