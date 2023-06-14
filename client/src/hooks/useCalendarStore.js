import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewEvent,
  onSetActiveEvent,
  onUpdateEvennt,
  onDeleteEvent,
  onLoadEvents,
} from '../store';
import calendarApi from '../api/calendarApi';
import { convertDate } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  /**
   * This function sets the active event in a calendar.
   * @param calendarEvent - The parameter `calendarEvent` is likely an object representing an event on
   * a calendar. It is being passed as an argument to the `setActiveEvent` function. The function then
   * dispatches an action `onSetActiveEvent` with the `calendarEvent` object as its payload. The
   * purpose of this
   */
  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  /**
   * This function saves a calendar event by either updating an existing event or creating a new one
   * using data from an API.
   * @param calendarEvent - The calendar event object that contains information about the event such as
   * title, start and end time, location, etc.
   * @returns The function `startSavingEvent` returns nothing (`undefined`). It either dispatches an
   * `onUpdateEvent` action or an `onAddNewEvent` action, or throws an error and displays an error
   * message using `Swal.fire`.
   */
  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvennt({ ...calendarEvent, user }));
        return;
      }

      const { data } = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error?.response.data?.msg, 'error');
    }
  };

  /**
   * This function deletes an event from a calendar and handles any errors that may occur.
   */
  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error?.response.data?.msg, 'error');
    }
  };

  /**
   * This function loads events from a calendar API and converts their dates before dispatching them.
   */
  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events');
      const events = convertDate(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //* Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
