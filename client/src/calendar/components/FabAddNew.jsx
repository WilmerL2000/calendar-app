import { useUIStore } from '../../hooks';

export const FabAddNew = () => {
  const { openDateModal } = useUIStore();

  return (
    <button className="btn btn-primary fab" onClick={openDateModal}>
      <i className="fa fa-plus"></i>
    </button>
  );
};
