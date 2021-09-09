import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Dropdown from '../../layout/Dropdown';
import DateRangePicker from '../../layout/DateRangePicker';
import { period as periodModel } from '../../../model/Period';
import Inputfield from '../../layout/Inputfield';
import DayTimePicker from '../../layout/DayTimePicker';

export default function PeriodAdd({ warehouses, handler, initialFocusRef }) {
  const [warehousePlaceholder, setWarehousePlaceholder] = useState('Choose warehouse');
  const [priorityPlaceholder, setPriorityPlaceholder] = useState('Choose priority');
  const [period, setPeriod] = useState(periodModel);

  useEffect(() => {
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

  function OpeningHourHandler(openingHours) {
    setPeriod({ ...period, openingHours });
  }
  function titelHandler(e) {
    setPeriod({ ...period, title: e.target.value });
  }

  return (
    <div className="text-color-default">
      <div>
        <Inputfield
          placeholder="Title"
          handler={titelHandler}
          focusRef={initialFocusRef}
        />
      </div>
      <div className="grid grid-flow-row xs:grid-cols-1 sm:grid-cols-2 gap-4">
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
      <div>
        <DateRangePicker
          fromHandler={dateRangerFromHandler}
          toHandler={dateRangeToHandler}
        />
      </div>
      <div>
        <DayTimePicker
          handler={OpeningHourHandler}
        />
      </div>
    </div>
  );
}
