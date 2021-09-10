/* eslint-disable no-unused-vars */
import FullCalendar from '@fullcalendar/react';
import React, { useState, useEffect, useRef } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import PeriodEditModal from '../period/edit/PeriodEditModal';
import useToggle from '../../Util/hooks/useToggle';

export default function CalendarView({ events, periods, refreshHandler }) {
  const [toggleEditModal, setToggleEditModal] = useToggle();
  const [period, setPeriod] = useState();

  function handleEventClick(clickInfo) {
    setPeriod(periods.find((p) => p.id === parseInt(clickInfo.event.id, 10)));
  }

  function toggleModal() {
    setPeriod(null);
  }

  return (
    <div className="h-screen">
      {period
      && (
      <PeriodEditModal
      // TODO figure out how to pass period
        period={period}
        toggleEdit={toggleModal}
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
