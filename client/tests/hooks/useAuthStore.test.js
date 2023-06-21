import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../src/store/auth/authSlice';
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { Provider } from 'react-redux';
import { testUserCredentials } from '../fixtures/testUser';
import { calendarApi } from '../../src/api';

/**
 * The function returns a mock Redux store with an initial state for the auth slice.
 * @param initialState - The initial state is the starting state of the Redux store. It is an object
 * that contains the initial values of the state properties defined in the reducers. In the code above,
 * the initialState is passed as a parameter to the getMockStore function and is used to set the
 * initial state of the auth slice
 * @returns The function `getMockStore` is returning a configured Redux store with an initial state for
 * the `auth` slice. The store is created using the `configureStore` function from the `redux-toolkit`
 * library, and the `reducer` property is set to an object with a single key `auth` that maps to the
 * reducer function for the `authSlice`.
 */
const getMockStore = (initialState) => {
  return configureStore({
    reducer: { auth: authSlice.reducer },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe('Tests on the useAuthStore custom hook', () => {
  beforeEach(() => localStorage.clear());

  test('It should return the default values ', () => {
    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });

  test('startLogin should perform the login correctly', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { startLogin } = result.current;

    await act(async () => {
      await startLogin(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Wilmer', uid: '6486950426b80dd6862157c4' },
    });

    expect(localStorage.getItem('token')).toEqual(expect.any(String));
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
  });

  test('startLogin should fail the authentication', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { startLogin } = result.current;

    await act(async () => {
      await startLogin({ email: 'test@example.com', password: 'Test123' });
    });

    const { errorMessage, status, user } = result.current;

    expect(localStorage.getItem('token')).toBe(null);

    expect({ errorMessage, status, user }).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: 'Credenciales incorrectas',
    });

    await waitFor(() => expect(result.errorMessage).toBe(undefined));
  });

  test('startRegister should create a user', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    /* This code is creating a spy on the `post` method of the `calendarApi` object and mocking its return
value to an object with `ok` set to `true`, a `uid`, a `name`, and a `token`. This is used in the
`startRegister` test to simulate a successful registration. */
    const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
      data: {
        ok: true,
        uid: '6486950426b80dd6862157c3',
        name: 'Test user',
        token: 'SOME-TOKEN',
      },
    });

    const { startRegister } = result.current;

    await act(async () => {
      await startRegister({
        email: 'test@example.com',
        password: 'Test123',
        name: 'Test user 2',
      });
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test user', uid: '6486950426b80dd6862157c3' },
    });

    spy.mockRestore();
  });

  test('startRegister should fail the creation', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { startRegister } = result.current;

    await act(async () => {
      await startRegister(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'Usuario ya registrado',
      status: 'not-authenticated',
      user: {},
    });
  });

  test('checkAuthToken should fail if there is no token', async () => {
    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { checkAuthToken } = result.current;

    await act(async () => {
      await checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'not-authenticated',
      user: {},
    });
  });

  test('checkAuthToken should authenticate the user if there is a token', async () => {
    const { data } = await calendarApi.post('/auth', testUserCredentials);
    localStorage.setItem('token', data.token);

    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { checkAuthToken } = result.current;

    await act(async () => {
      await checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Wilmer', uid: '6486950426b80dd6862157c4' },
    });
  });
});
