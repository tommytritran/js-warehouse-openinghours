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
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-4 border rounded-md px-4 py-2 my-2">
      <div className="flex items-center">
        <p className="xs:w-14 text-sm">From: </p>
        <input type="date" value={fromDate} onChange={fromDateHandler} className="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 rounded-md" />
      </div>
      <div className="flex flex-shrink-1 items-center">
        <p className="xs:w-14 sm:w-8 text-sm">To: </p>
        <input type="date" value={toDate} onChange={toDateHandler} className="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 rounded-md" />
      </div>
    </div>
  );
}
