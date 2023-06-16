import { onCloseDateModal, onOpenDateModal, uiSlice } from '../../../src/store';

describe('Testing on the uiSlice', () => {
  test('Debe de regresar el estado por defecto', () => {
    expect(uiSlice.getInitialState()).toEqual({
      isDateModalOpen: false,
      isDeleteModalOpen: false,
    });
  });

  test('You must change the isDateModalOpen correctly', () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
