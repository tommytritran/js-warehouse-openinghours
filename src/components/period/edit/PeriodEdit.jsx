import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Dropdown from '../../layout/Dropdown';
import DateRangePicker from '../../layout/DateRangePicker';
import Inputfield from '../../layout/Inputfield';
import DayTimePicker from '../../layout/DayTimePicker';

export default function PeriodEdit({ period, handler, initialFocusRef }) {
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

  function titleHandler(e) {
    setEditedPeriod({ ...period, title: e.target.value });
  }
  function OpeningHourHandler(openingHours) {
    setEditedPeriod({ ...period, openingHours });
  }
  return (
    <div className="text-color-default">
      <div className="">
        <Inputfield
          placeholder="Title"
          value={period.title}
          handler={titleHandler}
          focusRef={initialFocusRef}
        />
      </div>
      <div className="py-4">
        <DateRangePicker
          from={period.from}
          to={period.to}
          fromHandler={dateRangerFromHandler}
          toHandler={dateRangeToHandler}
        />
      </div>
      <div className="flex items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500  w-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 rounded-md">
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
        <div>
          <DayTimePicker
            data={period.openingHours}
            handler={OpeningHourHandler}
          />
        </div>
      </div>
    </div>
  );
}
