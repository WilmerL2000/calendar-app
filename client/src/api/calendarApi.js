import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
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
