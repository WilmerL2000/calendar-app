import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store';

export const useUIStore = () => {
  const { isDateModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  const toggleDateModal = () => {
    isDateModalOpen
      ? dispatch(onOpenDateModal())
      : dispatch(onCloseDateModal());
  };

  return {
    //* Properties
    isDateModalOpen,
    //* Methods
    openDateModal,
    closeDateModal,
    toggleDateModal,
  };
};
