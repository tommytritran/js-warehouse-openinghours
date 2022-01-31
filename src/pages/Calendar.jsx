import React, { useState, useEffect } from 'react';
import CalendarView from '../components/calendar/CalendarView';
import Dropdown from '../components/layout/Dropdown';
import { getAllPeriods } from '../service/PeriodService';
import getAllWarehouses from '../service/warehouseService';

export default function Calendar() {
  const [periods, setPeriods] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({ warehouse: 'Select warehouse', id: '' });

  useEffect(() => {
    (async () => {
      setPeriods(await getAllPeriods());
      setWarehouses(await getAllWarehouses());
    })();
  }, []);

  const locationSelector = (id, warehouse) => {
    setSelectedLocation({ warehouse, id });
  };

  const refreshHandler = () => {
    (async () => {
      setPeriods(await getAllPeriods());
    })();
  };

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <Dropdown
          data={warehouses.map((w) => ({ id: w.id, name: w.warehouse }))}
          handler={locationSelector}
          placeholder={selectedLocation.warehouse}
        />
      </div>
      <CalendarView
        periods={periods.filter((p) => p.warehouseId === selectedLocation.id)}
        refreshHandler={refreshHandler}
      />
    </div>
  );
}
