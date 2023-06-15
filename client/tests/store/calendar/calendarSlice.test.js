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

describe('Pruebas en el authSlice', () => {
  test('Debe de regresar  el estado por defecto', () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test('onSetActiveEvent debe de asignarse el state ', () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );
    expect(state.activeEvent).toEqual(events[0]);
  });

  test('onAddNewEvent debe de agregar el evento', () => {
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

  test('onUpdateEvennt debe de actualizar el evento', () => {
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

  test('onDeleteEvent debe de borrar el evento activo', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );
    expect(state.activeEvent).toBe(null);
    expect(state.events).not.toContain(events[0]);
  });

  test('onLoadEvents debe de establecer los eventos', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state.isLoading).toBeFalsy();
    expect(state.events).toEqual(events);

    const newState = calendarSlice.reducer(initialState, onLoadEvents(events));
    expect(state.events.length).toBe(events.length);
  });

  test('onLogoutCalendar debe de limpiar el state', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar()
    );
    expect(state).toEqual(initialState);
  });
});
