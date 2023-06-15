import { act, renderHook } from '@testing-library/react';
import { useUIStore } from '../../src/hooks/useUIStore';
import { Provider } from 'react-redux';
import { store, uiSlice } from '../../src/store';
import { configureStore } from '@reduxjs/toolkit';

/**
 * The function returns a mock Redux store with an initial state for the "ui" slice.
 * @param initialState - The initial state is the starting state of the Redux store. It is an object
 * that contains the initial values of all the state variables that the application needs. The
 * initialState parameter is passed to the getMockStore function to set the initial state of the ui
 * slice reducer.
 * @returns The function `getMockStore` is returning a configured Redux store with an initial state
 * provided as a parameter. The store has a single reducer `uiSlice.reducer` under the key `ui`.
 */
const getMockStore = (initialState) => {
  return configureStore({
    reducer: { ui: uiSlice.reducer },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe('Pruebas en el custom hook useUIStore', () => {
  test('Debe de regresar los valores por defecto', () => {
    const mockStore = getMockStore({
      isDateModalOpen: false,
      isDeleteModalOpen: false,
    });

    /* This code is testing the custom hook `useUIStore` by rendering it using the `renderHook` function
 from the `@testing-library/react` library. The `renderHook` function takes a function that returns
 the hook being tested, and an optional wrapper component that provides any necessary context or
 dependencies for the hook. In this case, the wrapper component is a Redux `Provider` that provides
 a mock store with an initial state. */
    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      isDateModalOpen: false,
      isDeleteModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function),
      openDeleteModal: expect.any(Function),
      closeDeleteModal: expect.any(Function),
    });
  });

  test('openDateModal debe de colocar true en el isDateModalOpen ', () => {
    const mockStore = getMockStore({
      isDateModalOpen: false,
      isDeleteModalOpen: false,
    });

    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { openDateModal } = result.current;

    /* `act()` is a function provided by the `@testing-library/react` library that ensures that all
    updates to the state and props of a component are applied and flushed before the test continues.
    In this case, `act()` is used to wrap the call to the `openDateModal()` function, which updates
    the state of the `isDateModalOpen` variable in the Redux store. By wrapping the call to
    `openDateModal()` in `act()`, we ensure that the state update is applied before the test
    continues, allowing us to make assertions about the updated state. */
    act(() => {
      openDateModal();
    });

    expect(result.current.isDateModalOpen).toBeTruthy();
  });

  test('closeDateModal debe de colocar false en el isDateModalOpen ', () => {
    const mockStore = getMockStore({
      isDateModalOpen: true,
      isDeleteModalOpen: false,
    });

    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { closeDateModal } = result.current;

    act(() => {
      closeDateModal();
    });

    expect(result.current.isDateModalOpen).toBeFalsy();
  });

  test('toggleDateModal debe de cambiar el state de isDateModalOpen ', () => {
    const mockStore = getMockStore({
      isDateModalOpen: true,
      isDeleteModalOpen: false,
    });

    const { result } = renderHook(() => useUIStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { toggleDateModal } = result.current;

    act(() => {
      toggleDateModal();
    });

    expect(result.current.isDateModalOpen).toBeFalsy();
  });
});
