/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { format } from 'date-fns';
import { PencilAltIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import PeriodEditModal from './edit/PeriodEditModal';

export default function PeriodListItem({ period, refreshPeriodList }) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [showPeriod, setShowPeriod] = useState(false);

  function togglePeriodEditModal(status) {
    if (status) {
      setToggleEdit(status);
    } else {
      setToggleEdit(!toggleEdit);
    }
  }

  function togglePeriod() {
    setShowPeriod(!showPeriod);
  }
  function getPriorityColor(priority) {
    switch (priority) {
      case 0:
        return 'bg-green-100 text-green-800';
      case 1:
        return 'bg-green-100 text-green-800';
      case 2:
        return 'bg-yellow-100 text-yellow-800';
      case 3:
      default:
        return 'bg-red-100 text-red-800';
    }
  }

  function renderPeriod(opening) {
    return (
      <div className="flex items-baseline" key={`period-${opening.weekday}`}>
        <div className="w-32">{opening.weekday}</div>
        {opening.closed
          ? <p className="text-red-700 text-center">Stengt</p>
          : (
            <div className="flex space-x-2">
              <p>{opening.openingHour}</p>
              <p>-</p>
              <p>{opening.closingHour}</p>
            </div>
          )}
      </div>
    );
  }
  const PeriodDate = `${format(new Date(period.from), 'yyyy.MM.dd')} - ${format(new Date(period.to), 'yyyy.MM.dd')}`;
  return (
    <>
      {toggleEdit && (
      <PeriodEditModal
        period={period}
        toggleEdit={togglePeriodEditModal}
        refreshPeriodList={refreshPeriodList}
      />
      )}
      <tr className="text-color-default hover:bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-color-default">{period.warehouse}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <button type="button" className={`flex space-x-2 ${showPeriod && 'font-bold pb-2'}`} onClick={() => togglePeriod()}>
            <div>{PeriodDate}</div>
            <div>{showPeriod ? <ChevronUpIcon className="w-4 h-4 mt-0.5" /> : <ChevronDownIcon className="w-4 h-4 mt-0.5" />}</div>
          </button>
          <div className="flex flex-col">
            {showPeriod && (
              period.openingHours.map((opening) => (
                renderPeriod(opening)
              ))
            )}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm ">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(period.priority)}`}>
            {period.priority}
          </span>
        </td>
        <td className=" whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900">
          <button type="button" className="flex px-6 py-4" onClick={() => togglePeriodEditModal(true)}>
            <PencilAltIcon className="h-6 w-6 mr-2" />
            Edit
          </button>
        </td>
      </tr>
    </>
  );
}
