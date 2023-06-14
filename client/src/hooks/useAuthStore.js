import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from '../store/auth/authSlice';
import { onLogoutCalendar } from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  /**
   * This function attempts to log in a user by sending their email and password to an API, and if
   * successful, stores their token and user information in local storage.
   */
  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth', { email, password });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log(error);
      dispatch(onLogout('Credenciales incorrectas'));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  /**
   * This function attempts to register a new user with an email, password, and name by making a POST
   * request to a calendar API and handling any errors that may occur.
   */
  const startRegister = async ({ email, password, name }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth/new', {
        email,
        password,
        name,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout(error?.response?.data?.msg));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  /**
   * This function checks if there is a valid authentication token stored in local storage and renews
   * it if possible, otherwise logs the user out.
   * @returns The function `checkAuthToken` is not returning anything explicitly, but it is likely
   * being used as an asynchronous action in a Redux application to check the validity of an
   * authentication token stored in the browser's local storage. Depending on the outcome of the token
   * check, the function may dispatch a `onLogin` or `onLogout` action to update the application state.
   */
  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get('/auth/renew');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  /**
   * The function clears local storage and dispatches two logout actions.
   */
  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
    dispatch(onLogoutCalendar());
  };

  return {
    //* Properties
    status,
    user,
    errorMessage,
    //* Methods
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
