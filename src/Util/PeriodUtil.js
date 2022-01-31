/* eslint-disable no-unused-vars */
import { isAfter, isBefore, parseISO } from 'date-fns';

function includeOpeningHours(startDate, endDate, period) {
  return isBefore(parseISO(period.from), endDate) && isAfter(parseISO(period.to), startDate);
}

export default function createCalendarEventsByDate(events, periods, startDate, endDate) {
  events.forEach((event) => {
    const period = periods.find((p) => p.id === event.id);
    if (includeOpeningHours(startDate, endDate, period)) {
      console.log('here');
    }
  });
}

function generateEventWeek() {

}
