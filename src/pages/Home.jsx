import React, { useState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { getAllPeriods } from '../service/PeriodService';
import Dropdown from '../components/layout/Dropdown';
import PeriodList from '../components/period/PeriodList';
import getAllWarehouses from '../service/warehouseService';
import PeriodAddModal from '../components/period/add/PeriodAddModal';

export default function Home() {
  const [periods, setPeriods] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWareHouse, setSelectedWareHouse] = useState(-1);
  const [locationPlaceholder, setLocationPlaceholder] = useState('Show all');

  const [showPeriodAdd, setShowPeriodAdd] = useState(false);

  useEffect(() => {
    (async () => {
      setPeriods(await getAllPeriods());
      setWarehouses(await getAllWarehouses());
    })();
  }, []);

  function locationSelector(id, warehouse) {
    setSelectedWareHouse(id);
    setLocationPlaceholder(warehouse);
  }

  function togglePeriodAdd() {
    setShowPeriodAdd(!showPeriodAdd);
  }

  function refreshPeriodList() {
    console.log('refreshPeriodList');

    (async () => {
      setPeriods(await getAllPeriods());
    })();
  }
  return (
    <div className="sm:px-6 lg:px-8 pt-4 h-screen bg-gray-100">
      <div className="flex xs:justify-center md:justify-start">
        <Dropdown
          data={warehouses.map((w) => ({ id: w.id, name: w.warehouse }))}
          handler={locationSelector}
          placeholder={locationPlaceholder}
        />
        <button
          type="button"
          className="xs:ml-4 default-btn"
          onClick={() => togglePeriodAdd()}
        >
          <PlusCircleIcon className="h-4 w-4 mr-2" />
          Add period
        </button>
      </div>
      {showPeriodAdd
      && (
      <PeriodAddModal
        togglePeriodAdd={togglePeriodAdd}
        warehouses={warehouses}
        refreshPeriodList={refreshPeriodList}
      />
      )}
      {selectedWareHouse >= 0
        ? (
          <PeriodList
            periods={periods.filter((p) => p.warehouseId === selectedWareHouse)}
            refreshPeriodList={refreshPeriodList}
          />
        )
        : <PeriodList periods={periods} refreshPeriodList={refreshPeriodList} />}
    </div>
  );
}
