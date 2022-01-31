import React from 'react';
import { openingHours } from '../../../model/Period';

export default function OpeningHours({ openingHourData }) {
  const data = openingHourData || openingHours;
  function getWeekdayData(day) {
    const result = data.find((d) => d.weekday === day);
    if (result) {
      return result;
    }
    return openingHours.find((d) => d.weekday === day);
  }

  return (
    openingHours.map((oh) => {
      const day = getWeekdayData(oh.weekday);
      return (
        <div className="flex items-baseline" key={`period-${day.weekday}`}>
          <div className="w-32">{day.weekday}</div>
          {day.closed
            ? <p className="text-red-700 text-center">Stengt</p>
            : (
              <div className="flex space-x-2">
                <p>{day.openingHour || 'n/a'}</p>
                <p>-</p>
                <p>{day.closingHour || 'n/a'}</p>
              </div>
            )}
        </div>
      );
    })
  );
}
