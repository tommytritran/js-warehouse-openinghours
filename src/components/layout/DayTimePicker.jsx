import React, { useRef } from 'react';
import DayPicker from './DayPicker';
import { openingHours as openingHoursModel } from '../../model/Period';

export default function DayTimePicker({ data, handler }) {
  const openingHours = useRef(openingHoursModel);
  const openingHourData = data || openingHoursModel;
  function closingHourHandler(weekday, closingHour) {
    openingHours.current = openingHours.current.map(
      (oh) => (oh.weekday === weekday ? { ...oh, closingHour } : oh),
    );
    handler(openingHours.current);
  }
  function openingHourHandler(weekday, openingHour) {
    openingHours.current = openingHours.current.map(
      (oh) => (oh.weekday === weekday ? { ...oh, openingHour } : oh),
    );
    handler(openingHours.current);
  }
  function closedHandler(weekday, closed) {
    openingHours.current = openingHours.current.map(
      (oh) => (
        oh.weekday === weekday ? { ...oh, closed } : oh
      ),
    );
    handler(openingHours.current);
  }

  function getOpeningHourByDay(day) {
    const result = openingHourData.find((openingHour) => openingHour.weekday === day);
    if (result) {
      return result;
    }
    return openingHoursModel.find((openingHour) => openingHour.weekday === day);
  }

  return (
    <div className="border rounded-md my-4 px-4 py-2">
      <div className="grid grid-cols-4 py-2 text-sm">
        <div className="col-start-2">From</div>
        <div>To</div>
        <div>Closed</div>
      </div>
      {
        openingHours.current.map((d) => (
          <DayPicker
            key={`daypicker-${d.weekday}`}
            opening={getOpeningHourByDay(d.weekday)}
            closingHourHandler={closingHourHandler}
            openingHourHandler={openingHourHandler}
            closedHandler={closedHandler}
          />
        ))
        }
    </div>
  );
}
