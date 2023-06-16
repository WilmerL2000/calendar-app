import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvennt,
} from '../../../src/store/calendar/calendarSlice';
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from '../../fixtures/calendarStates';

describe('Tests in the authSlice', () => {
  test('It should return the default state', () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test('onSetActiveEvent must be assigned the state ', () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );
    expect(state.activeEvent).toEqual(events[0]);
  });

  test('onAddNewEvent should add the event', () => {
    const newEvent = {
      id: '3',
      title: 'Cumpleanios de Maria',
      notes: 'Hay que celebrarlo',
      start: new Date('2023-06-17 14:00:00'),
      end: new Date('2023-06-17 17:00:00'),
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );

    expect(state.events).toEqual([...events, newEvent]);
  });

  test('onUpdateEvennt should update the event', () => {
    const updatedEvent = {
      id: '1',
      title: 'Cumpleanios de Wilmer act',
      notes: 'Hay que celebrarlo act',
      start: new Date('2023-06-17 14:00:00'),
      end: new Date('2023-06-17 17:00:00'),
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvennt(updatedEvent)
    );

    expect(state.events).toContain(updatedEvent);
  });

  test('onDeleteEvent should delete the active event', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );
    expect(state.activeEvent).toBe(null);
    expect(state.events).not.toContain(events[0]);
  });

  test('onLoadEvents should set the events', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state.isLoading).toBeFalsy();
    expect(state.events).toEqual(events);

    const newState = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state.events.length).toBe(events.length);
  });

  test('onLogoutCalendar should clear the state', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar()
    );
    expect(state).toEqual(initialState);
  });
});
