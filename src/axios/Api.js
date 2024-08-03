import axios from 'axios';

// Set up base URL for Axios
axios.defaults.baseURL = 'https://backend-node-express-mongoose-stripe-jwt.onrender.com/api';

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('CC_Token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Add a response interceptor
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      let refreshToken = localStorage.getItem('refresh_token');
      
      if (refreshToken) {
        try {
          const res = await axios.post('/user/refreshToken', { refreshToken });

          if (res.status === 200) {
            // Save new tokens to localStorage
            localStorage.setItem('CC_Token', res.data.token);
            localStorage.setItem('refresh_token', res.data.refreshToken);

            // Update Axios headers
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('CC_Token');

            // Retry original request
            return axios(originalRequest);
          }
        } catch (refreshError) {
          console.error('Refresh token error:', refreshError);
          // Handle token refresh errors
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
