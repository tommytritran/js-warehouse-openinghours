import React, { useState, useEffect } from 'react';
import CalendarView from '../components/calendar/CalendarView';
import Dropdown from '../components/layout/Dropdown';
import { getAllPeriods } from '../service/PeriodService';
import getAllWarehouses from '../service/warehouseService';
import { getColorByPriority } from '../Util/colors/ColorScheme';

export default function Calendar() {
  const [periods, setPeriods] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [locationPlaceholder, setLocationPlaceholder] = useState('Select warehouse');
  const [events, setEvents] = useState([]);

  function convertPeriodToCalenderEvent(periodList) {
    const eventList = periodList.map((p) => ({
      id: p.id,
      title: `${p.warehouse} - ${p.priority}`,
      start: p.from,
      end: p.to,
      backgroundColor: getColorByPriority(p.priority),
      textColor: 'black',
    }));
    return eventList;
  }

  useEffect(() => {
    (async () => {
      setPeriods(await getAllPeriods());
      setWarehouses(await getAllWarehouses());
    })();
  }, []);

  function locationSelector(id, warehouse) {
    setLocationPlaceholder(warehouse);
    const selectedPriod = periods.filter((p) => p.warehouseId === id);
    const convertedEvents = convertPeriodToCalenderEvent(selectedPriod);
    setEvents(convertedEvents);
  }

  function refreshHandler() {
    (async () => {
      setPeriods(await getAllPeriods());
    })();
  }

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <Dropdown
          data={warehouses.map((w) => ({ id: w.id, name: w.warehouse }))}
          handler={locationSelector}
          placeholder={locationPlaceholder}
        />
      </div>
      <CalendarView events={events} periods={periods} refreshHandler={refreshHandler} />
    </div>
  );
}
