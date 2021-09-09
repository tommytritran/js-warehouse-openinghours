/* eslint-disable no-unused-vars */
import FullCalendar from '@fullcalendar/react';
import React, { useState, useEffect, useRef } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import PeriodEditModal from '../period/edit/PeriodEditModal';
import useToggle from '../../Util/hooks/useToggle';

export default function CalendarView({ events, periods, refreshHandler }) {
  const [toggleEditModal, setToggleEditModal] = useToggle();
  const [period, setPeriod] = useState({});
  const mounted = useRef();

  useEffect(() => {
    console.log(events);

    if (!mounted.current) {
      mounted.current = true;
    } else {
      setToggleEditModal();
    }
  }, [period]);

  function handleEventClick(clickInfo) {
    setPeriod(periods.filter((p) => p.id === parseInt(clickInfo.event.id, 10)));
  }

  return (
    <div className="h-screen">
      {toggleEditModal
      && (
      <PeriodEditModal
      // TODO figure out how to pass period
        period={periods[0]}
        toggleEdit={setToggleEditModal}
        refreshPeriodList={refreshHandler}
      />
      )}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale="en"
        firstDay={1}
        eventClick={handleEventClick}
      />
    </div>
  );
}
