import axios from 'axios';

const calendarApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/* This code block is adding an interceptor to the `calendarApi` instance of the Axios library. The
interceptor is intercepting all outgoing requests made by the `calendarApi` instance and modifying
the request headers to include an `Authorization` header with a bearer token. */
calendarApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers = {
    Authorization: `Bearer ${token}`,
  };
  return config;
});

export default calendarApi;
