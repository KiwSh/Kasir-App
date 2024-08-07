// import axios
import axios from 'axios';

// import js-cookie
import Cookies from 'js-cookie';

// Create an Axios instance
const Api = axios.create({
  // Set endpoint API
  baseURL: 'http://127.0.0.1:8000/',

  // Set header axios
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
});

// Handle unauthenticated
Api.interceptors.response.use(
  function(response) {
    // Return response
    return response;
  },
  function(error) {
    // Check if response unauthenticated
    if (401 === error.response.status) {
      // Remove token
      Cookies.remove('token');

      // Remove user
      Cookies.remove('user');

      // Remove permissions
      Cookies.remove('permissions');

      // Redirect to login
      window.location = '/';
    } else if (403 === error.response.status) {
      // Redirect to forbidden
      window.location = '/forbidden';
    } else {
      // Reject promise error
      return Promise.reject(error);
    }
  }
);

export default Api;
