import { addHours } from 'date-fns';
import { useCalendarStore, useUIStore } from '../../hooks';

export const FabAddNew = () => {
  const { openDateModal } = useUIStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    openDateModal();
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#fafafa',
      user: {
        _id: '123',
        name: 'Wilmer',
      },
    });
  };

  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fa fa-plus"></i>
    </button>
  );
};
