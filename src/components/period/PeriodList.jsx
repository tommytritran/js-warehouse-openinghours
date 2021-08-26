/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import getAllPeriods from '../../service/PeriodService';
import PeriodListItem from './PeriodListItem';

export default function PeriodList() {
  const [periods, setPeriods] = useState([]);

  // Fetch period on load
  useEffect(() => {
    (async () => {
      const data = await getAllPeriods();
      setPeriods(data);
    })();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto ">
        <div className="py-4 align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Warehouse
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Period
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Priority
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {periods.map((p, index) => <PeriodListItem period={p} index={index} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
