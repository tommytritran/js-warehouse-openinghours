import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import DayPicker from '../../layout/DayPicker';
import Dropdown from '../../layout/Dropdown';
import DateRangePicker from '../../layout/DateRangePicker';

export default function PeriodEdit({ period, handler }) {
  const [priorityPlaceholder, setPriorityPlaceholder] = useState(period.priority || 1);
  const [editedPeriod, setEditedPeriod] = useState(period);

  useEffect(() => {
    handler(editedPeriod);
  }, [editedPeriod]);

  function priorityHandler(id, priority) {
    setPriorityPlaceholder(priority);
    setEditedPeriod({ ...period, priority });
  }

  function dateRangerFromHandler(date) {
    setEditedPeriod({ ...period, from: date });
  }
  function dateRangeToHandler(date) {
    setEditedPeriod({ ...period, to: date });
  }

  function closingHourHandler(weekday, closingHour) {
    setEditedPeriod({
      ...period,
      openingHours: period.openingHours.map(
        (oh) => (oh.weekday === weekday ? { ...oh, closingHour } : oh),
      ),
    });
  }
  function openingHourHandler(weekday, openingHour) {
    setEditedPeriod({
      ...period,
      openingHours: period.openingHours.map(
        (oh) => (oh.weekday === weekday ? { ...oh, openingHour } : oh),
      ),
    });
  }

  function closedHandler(weekday, closed) {
    setEditedPeriod({
      ...period,
      openingHours: period.openingHours.map(
        (oh) => (
          oh.weekday === weekday ? { ...oh, closed } : oh
        ),
      ),
    });
  }
  return (
    <div className="default-text-color">
      <div className="py-4">
        <DateRangePicker
          from={period.from}
          to={period.to}
          fromHandler={dateRangerFromHandler}
          toHandler={dateRangeToHandler}
        />
      </div>
      <div className="flex py-4 border-t-2 border-b-2">
        <div>
          Priority:
        </div>
        <div className="pl-4">
          <Dropdown
            data={_.range(1, 11).map((num) => ({ id: num, name: num }))}
            placeholder={priorityPlaceholder}
            handler={priorityHandler}
          />
        </div>
      </div>
      <div className="sm:text-left py-4">
        <div className="grid grid-cols-4 font-bold">
          <div className="col-start-2">From</div>
          <div>to</div>
          <div>Closed</div>
        </div>
        {period.openingHours.map((opening) => (
          <DayPicker
            key={`daypicker-${opening.weekday}`}
            opening={opening}
            closingHourHandler={closingHourHandler}
            openingHourHandler={openingHourHandler}
            closedHandler={closedHandler}
          />
        ))}
      </div>
    </div>
  );
}
