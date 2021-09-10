import React, { useState } from 'react';

export default function DayPicker({
  opening, closingHourHandler, openingHourHandler, closedHandler,
}) {
  const [toValue, setToValue] = useState(opening.closingHour || '');
  const [fromValue, setfromValue] = useState(opening.openingHour || '');
  const [showError, setShowError] = useState(false);
  const [isClosed, setIsClosed] = useState(opening.closed || false);

  function toValueHandler(e) {
    if (fromValue !== '' && fromValue >= e.target.value) {
      setShowError(3);
    } else {
      setShowError(false);
      setToValue(e.target.value);
      closingHourHandler(opening.weekday, e.target.value);
    }
  }
  function fromValueHandler(e) {
    if (toValue !== '' && e.target.value >= toValue) {
      setShowError(2);
    } else {
      setShowError(false);
      setfromValue(e.target.value);
      openingHourHandler(opening.weekday, e.target.value);
    }
  }
  function closedValueHandler(e) {
    setIsClosed(e.target.checked);
    closedHandler(opening.weekday, (!!e.target.checked));
  }
  return (
    <div key={opening.weekday}>
      {showError && (
      <div className="grid grid-cols-4">
        <div className={`col-start-${showError} text-red-700 text-xs`}>Invalid</div>
      </div>
      )}
      <div className="grid grid-cols-4">
        <div className="text-sm">{opening.weekday}</div>
        <div><input type="time" value={isClosed ? '' : fromValue} onChange={fromValueHandler} /></div>
        <div><input type="time" value={isClosed ? '' : toValue} onChange={toValueHandler} min={fromValue} /></div>
        <div><input type="checkbox" onChange={closedValueHandler} checked={isClosed} /></div>
      </div>
    </div>
  );
}
