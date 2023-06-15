import { onCloseDateModal, onOpenDateModal, uiSlice } from '../../../src/store';

describe('Pruebas en el uiSlice', () => {
  test('Debe de regresar el estado por defecto', () => {
    expect(uiSlice.getInitialState()).toEqual({
      isDateModalOpen: false,
      isDeleteModalOpen: false,
    });
  });

  test('Debe de cambiar el isDateModalOpen correctamente', () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
