import React, { useState } from 'react';

export default function DateRangePicker({
  from, to, fromHandler, toHandler,
}) {
  const [toDate, setToDate] = useState(to || '');
  const [fromDate, setFromDate] = useState(from || '');
  function toDateHandler(e) {
    setToDate(e.target.value);
    toHandler(e.target.value);
  }

  function fromDateHandler(e) {
    setFromDate(e.target.value);
    fromHandler(e.target.value);
  }

  return (
    <div>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex">
          <p className="xs:w-14">From: </p>
          <input type="date" value={fromDate} onChange={fromDateHandler} />
        </div>
        <div className="flex flex-shrink-1">
          <p className="xs:w-14 sm:w-8">To: </p>
          <input type="date" value={toDate} onChange={toDateHandler} />
        </div>
      </div>
    </div>
  );
}
