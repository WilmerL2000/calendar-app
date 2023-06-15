export const events = [
  {
    id: '1',
    title: 'Cumpleanios de Wilmer',
    notes: 'Hay que celebrarlo',
    start: new Date('2023-06-15 14:00:00'),
    end: new Date('2023-06-15 17:00:00'),
  },
  {
    id: '2',
    title: 'Cumpleanios de Juan',
    notes: 'Hay que celebrarlo',
    start: new Date('2023-06-17 14:00:00'),
    end: new Date('2023-06-17 17:00:00'),
  },
];

export const initialState = {
  isLoading: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoading: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoading: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
