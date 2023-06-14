import { useDispatch, useSelector } from 'react-redux';
import {
  onCloseDateModal,
  onCloseDeleteModal,
  onOpenDateModal,
  onOpenDeleteModal,
  onSetActiveEvent,
} from '../store';

export const useUIStore = () => {
  const { isDateModalOpen, isDeleteModalOpen } = useSelector(
    (state) => state.ui
  );
  const dispatch = useDispatch();

  /**
   * The function `openDateModal` dispatches an action to open a date modal.
   */
  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  /**
   * This function calls the onCloseDateModal action using dispatch.
   */
  const closeDateModal = () => {
    dispatch(onSetActiveEvent(null));
    dispatch(onCloseDateModal());
  };

  /**
   * This function calls the onOpenDeleteModal action using the dispatch method.
   */
  const openDeleteModal = () => {
    dispatch(onOpenDeleteModal());
  };

  /**
   * This function calls the onCloseDeleteModal action when the closeDeleteModal function is executed.
   */
  const closeDeleteModal = () => {
    dispatch(onCloseDeleteModal());
    dispatch(onSetActiveEvent(null));
  };

  const toggleDateModal = () => {
    isDateModalOpen
      ? dispatch(onOpenDateModal())
      : dispatch(onCloseDateModal());
  };

  return {
    //* Properties
    isDateModalOpen,
    isDeleteModalOpen,
    //* Methods
    openDateModal,
    closeDateModal,
    toggleDateModal,
    openDeleteModal,
    closeDeleteModal,
  };
};
