/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import FullCalendar from '@fullcalendar/react';
import React, { useState, useEffect, useRef } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {
  isBefore, addDays, parseISO, isEqual, getDay, format,
} from 'date-fns';
import { func } from 'prop-types';
import PeriodEditModal from '../period/edit/PeriodEditModal';
import { getColorByPriority } from '../../Util/colors/ColorScheme';

export default function CalendarView({ periods, refreshHandler }) {
  const [selectedPeriod, setSelectedPeriod] = useState();
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  function getTitle(periodObject) {
    if (periodObject.title) {
      return `${periodObject.title} - ${periodObject.priority}`;
    }
    return `${periodObject.warehouse} - ${periodObject.priority}`;
  }
  function isDateInPeriod(currentDate, period) {
    const from = parseISO(period.from);
    const to = parseISO(period.to);
    if (currentDate >= from && currentDate < to) {
      return true;
    }
    // if period is only one day
    if (isEqual(from, to) && isEqual(currentDate, from)) {
      return true;
    }
    return false;
  }

  function createEventByDate(currentDate, period) {
    const weekDayIndex = getDay(currentDate) - 1;
    const openingHour = period.openingHours[weekDayIndex];
    return {
      id: period.id,
      title: getTitle(period),
      start: format(currentDate, 'yyyy-MM-dd'),
      end: format(currentDate, 'yyyy-MM-dd'),
      backgroundColor: getColorByPriority(period.priority),
      textColor: 'black',
      extendedProps: {
        openingHour,
        priority: period.priority,
      },
    };
  }

  function gethighestPriortiy(events) {
    return events.reduce((prev, curr) => (curr.extendedProps.priority < prev.extendedProps.priority ? curr : prev));
  }
  function initEventsByPeriods() {
    if (periods) {
      const { startDate, endDate } = selectedMonth;
      const events = [];
      for (let currentDate = startDate; isBefore(currentDate, endDate); currentDate = addDays(currentDate, 1)) {
        let currentPriority = 0;
        const eventsPerDate = [];
        for (let i = 0; i < periods.length; i++) {
          const period = periods[i];
          currentPriority = period.priority;
          if (isDateInPeriod(currentDate, period)) {
            const event = createEventByDate(currentDate, period);
            eventsPerDate.push(event);
          }
        }
        if (eventsPerDate.length > 0) {
          const event = gethighestPriortiy(eventsPerDate);
          events.push(event);
        }
      }
      if (events.length > 0) {
        return events;
      }
    }
    return [];
  }

  useEffect(() => {
    const events = initEventsByPeriods();
    setCalendarEvents(events);
  }, [periods, selectedMonth]);

  const handleEventClick = (clickInfo) => {
    setSelectedPeriod(periods.find((p) => p.id === parseInt(clickInfo.event.id, 10)));
  };

  const toggleModal = () => {
    setSelectedPeriod(null);
  };

  const dateSelector = (date) => {
    const startDate = date.start;
    const endDate = date.end;

    setSelectedMonth({ startDate, endDate });
  };

  function getOpeningHourString(openingHourInfo) {
    if (openingHourInfo.closed) {
      return 'Stengt';
    }
    return `${openingHourInfo.openingHour} - ${openingHourInfo.closingHour}`;
  }

  const renderEventContent = (data) => {
    const openingHourInfo = data.event.extendedProps.openingHour;
    if (openingHourInfo) {
      const openingHour = getOpeningHourString(openingHourInfo);
      console.log(openingHourInfo);
      return (<p>{`${openingHour}`}</p>);
    }
    return 'Mangler åpningstid';
  };
  return (
    <div className="">
      {selectedPeriod
      && (
      <PeriodEditModal
        period={selectedPeriod}
        toggleEdit={toggleModal}
        refreshPeriodList={refreshHandler}
      />
      )}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        locale="en"
        firstDay={1}
        eventClick={handleEventClick}
        datesSet={dateSelector}
        height={1000}
        eventContent={renderEventContent}
      />
    </div>
  );
}
