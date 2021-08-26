import React from 'react';
import _ from 'lodash';

export default function PeriodEdit({ ref, period }) {
  function renderPeriod(opening) {
    const closed = opening.openingHour === 'closed';
    return (
      <>
        <div>{opening.weekday}</div>
        <div><input type="time" step="900" value={opening.openingHour} /></div>
        <div><input type="time" value={opening.closingHour} /></div>
        <div><input type="checkbox" checked={closed} /></div>
      </>
    );
  }

  return (
    <div className="default-text-color">
      <div className="grid sm: grid-cols-1 md:grid-cols-2 my-4">
        <div className="flex">
          <p className="xs:w-10">From: </p>
          <input ref={ref} type="date" className="ml-4" value={period.from} />
        </div>
        <div className="flex md:pl-4">
          <p className="xs:w-10 md:w-4">To: </p>
          <input type="date" className="ml-4" value={period.to} />
        </div>
      </div>
      <div className="grid grid-cols-2 my-4 pt-2 border-t-2">
        <div>
          Priority:
        </div>
        <div className="pl-4">
          <select>
            {_.range(1, 11).map((i) => {
              if (i === period.priority) {
                return <option value={i} selected>{i}</option>;
              }
              return <option value={i}>{i}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="sm:text-left">
        <div className="grid grid-cols-4 pt-2 font-bold border-t-2">
          <div className="col-start-2">From</div>
          <div>to</div>
          <div>Closed</div>
        </div>
        <div className="grid grid-cols-4 ">
          {period.openingHours.map((opening) => (
            renderPeriod(opening)
          ))}
        </div>
      </div>
    </div>
  );
}
