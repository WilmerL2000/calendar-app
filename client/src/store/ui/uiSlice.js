import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDateModalOpen: false,
  isDeleteModalOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    },
    onOpenDeleteModal: (state) => {
      state.isDeleteModalOpen = true;
    },
    onCloseDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
    },
  },
});

export const {
  onOpenDateModal,
  onCloseDateModal,
  onOpenDeleteModal,
  onCloseDeleteModal,
} = uiSlice.actions;
