/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { format } from 'date-fns';
import { PencilAltIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import PeriodEditModal from '../edit/PeriodEditModal';
import useToggle from '../../../Util/hooks/useToggle';
import OpeningHours from './OpeningHours';

export default function PeriodListItem({ period, refreshPeriodList }) {
  const [showPeriod, setShowPeriod] = useState(false);
  const [toggleEdit, setToggleEdit] = useToggle(false);
  let periodDate = '';
  if (period.from !== '' && period.to !== '') {
    periodDate = `${format(new Date(period.from), 'yyyy.MM.dd')} - ${format(new Date(period.to), 'yyyy.MM.dd')}`;
  } else {
    periodDate = 'ikke oppgitt';
  }

  function togglePeriod() {
    setShowPeriod(!showPeriod);
  }
  function getPriorityColor(priority) {
    switch (priority) {
      case 0:
        return 'bg-red-200 text-red-900';
      case 1:
        return 'bg-red-100 text-red-800';
      case 2:
        return 'bg-yellow-200 text-yellow-900';
      case 3:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  }
  return (
    <>
      {toggleEdit && (
      <PeriodEditModal
        period={period}
        toggleEdit={setToggleEdit}
        refreshPeriodList={refreshPeriodList}
      />
      )}
      <tr className="text-color-default hover:bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-color-default w-44">{period.warehouse}</td>
        <td className="px-6 py-4  text-sm text-color-default w-44">{period.title}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <button type="button" className={`flex space-x-2 ${showPeriod && 'font-bold pb-2'}`} onClick={() => togglePeriod()}>
            <div>{periodDate}</div>
            <div>{showPeriod ? <ChevronUpIcon className="w-4 h-4 mt-0.5" /> : <ChevronDownIcon className="w-4 h-4 mt-0.5" />}</div>
          </button>
          <div className="flex flex-col">
            {showPeriod && <OpeningHours openingHourData={period.openingHours} />}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm ">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(period.priority)}`}>
            {period.priority}
          </span>
        </td>
        <td className=" whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900">
          <button type="button" className="flex px-6 py-4" onClick={() => setToggleEdit(true)}>
            <PencilAltIcon className="h-6 w-6 mr-2" />
            Edit
          </button>
        </td>
      </tr>
    </>
  );
}
