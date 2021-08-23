/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { format } from 'date-fns';
import { PencilAltIcon } from '@heroicons/react/outline';

export default function Period({ period, toggleEdit }) {
  const periods = `${format(new Date(period.from), 'yyyy.MM.dd')} - ${format(new Date(period.to), 'yyyy.MM.dd')}`;
  return (
    <>
      <tr key={period.id}>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{period.name}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{periods}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {period.priority}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900 flex">
          <PencilAltIcon className="h-6 w-6 " aria-hidden="true" />
          <button type="button" onClick={toggleEdit} className="ml-4">Edit</button>
        </td>
      </tr>
    </>
  );
}
