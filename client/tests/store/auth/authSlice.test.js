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

describe('Pruebas en el authSlice', () => {
  test('Debe de regresar el estado por defecto', () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test('Debe de realizar el login ', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test('Debe de realizar el logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout());
    expect(state).toEqual(notAuthenticatedState);
  });

  test('Debe de realizar el logout con un mensaje de error', () => {
    const errorMessage = 'Credenciales incorrectas';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: errorMessage,
    });
  });

  test('Debe de limpiar el mensaje de error', () => {
    const errorMessage = 'Credenciales incorrectas';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    const newState = authSlice.reducer(state, clearErrorMessage());
    expect(newState.errorMessage).toBe(undefined);
  });
});
