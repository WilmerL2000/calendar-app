import {
  authSlice,
  clearErrorMessage,
  onLogin,
  onLogout,
} from '../../../src/store/auth/authSlice';
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from '../../fixtures/authStates';
import { testUserCredentials } from '../../fixtures/testUser';

describe('Tests in the authSlice', () => {
  test('It should return the default state', () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test('You must log in', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test('You must log out', () => {
    const state = authSlice.reducer(authenticatedState, onLogout());
    expect(state).toEqual(notAuthenticatedState);
  });

  test('You should log out with an error message', () => {
    const errorMessage = 'Credenciales incorrectas';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: errorMessage,
    });
  });

  test('You should clear the error message', () => {
    const errorMessage = 'Credenciales incorrectas';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    const newState = authSlice.reducer(state, clearErrorMessage());
    expect(newState.errorMessage).toBe(undefined);
  });
});
