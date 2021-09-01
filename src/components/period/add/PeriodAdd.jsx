import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Dropdown from '../../layout/Dropdown';
import DayPicker from '../../layout/DayPicker';
import DateRangePicker from '../../layout/DateRangePicker';
import { period as periodModel, days } from '../../../model/Period';

export default function PeriodAdd({ warehouses, handler }) {
  const [warehousePlaceholder, setWarehousePlaceholder] = useState('Choose warehouse');
  const [priorityPlaceholder, setPriorityPlaceholder] = useState('Choose priority');
  const [period, setPeriod] = useState(periodModel);

  useEffect(() => {
    console.log(period);
    handler(period);
  }, [period]);

  function priorityHandler(id, priority) {
    setPriorityPlaceholder(priority);
    setPeriod({ ...period, priority });
  }

  function warehouseHandler(warehouseId, warehouse) {
    setWarehousePlaceholder(warehouse);
    setPeriod({ ...period, warehouse, warehouseId });
  }

  function dateRangerFromHandler(date) {
    setPeriod({ ...period, from: date });
  }
  function dateRangeToHandler(date) {
    setPeriod({ ...period, to: date });
  }
  function closingHourHandler(weekday, closingHour) {
    setPeriod({
      ...period,
      openingHours: period.openingHours.map(
        (oh) => (oh.weekday === weekday ? { ...oh, closingHour } : oh),
      ),
    });
  }
  function openingHourHandler(weekday, openingHour) {
    setPeriod({
      ...period,
      openingHours: period.openingHours.map(
        (oh) => (oh.weekday === weekday ? { ...oh, openingHour } : oh),
      ),
    });
  }
  function closedHandler(weekday, closed) {
    setPeriod({
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
      <div className="grid grid-flow-row xs:grid-cols-1 sm:grid-cols-2 gap-4  py-4 border-b-2">
        <Dropdown
          data={warehouses.map((w) => ({ id: w.id, name: w.warehouse }))}
          placeholder={warehousePlaceholder}
          handler={warehouseHandler}
        />
        <Dropdown
          data={_.range(1, 11).map((num) => ({ id: num, name: num }))}
          placeholder={priorityPlaceholder}
          handler={priorityHandler}
        />
      </div>
      <div className="py-4 border-b-2">
        <DateRangePicker
          fromHandler={dateRangerFromHandler}
          toHandler={dateRangeToHandler}
        />
      </div>
      <div className="">
        <div className="grid grid-cols-4 font-semibold py-2">
          <div className="col-start-2">From</div>
          <div>To</div>
          <div>Closed</div>
        </div>
        {
            days.map((d) => (
              <DayPicker
                key={`daypicker-${d.weekday}`}
                opening={d}
                closingHourHandler={closingHourHandler}
                openingHourHandler={openingHourHandler}
                closedHandler={closedHandler}
              />
            ))
        }
      </div>
    </div>
  );
}
