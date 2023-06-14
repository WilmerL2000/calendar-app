import { useCalendarStore, useUIStore } from '../../hooks';

export const FabDelete = () => {
  const { hasEventSelected } = useCalendarStore();
  const { openDeleteModal } = useUIStore();

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={openDeleteModal}
      style={{ display: hasEventSelected ? '' : 'none' }}
    >
      <i className="fa fa-trash-alt"></i>
    </button>
  );
};
