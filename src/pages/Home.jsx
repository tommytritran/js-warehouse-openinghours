import React, { useState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { getAllPeriods } from '../service/PeriodService';
import Dropdown from '../components/layout/Dropdown';
import PeriodList from '../components/period/list/PeriodList';
import getAllWarehouses from '../service/warehouseService';
import PeriodAddModal from '../components/period/add/PeriodAddModal';
import useToggle from '../Util/hooks/useToggle';

export default function Home() {
  const [periods, setPeriods] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWareHouse, setSelectedWareHouse] = useState(-1);
  const [locationPlaceholder, setLocationPlaceholder] = useState('Show all');
  const [togglePeriodAdd, setTogglePeriodAdd] = useToggle(false);

  useEffect(() => {
    (async () => {
      setPeriods(await getAllPeriods());
      setWarehouses(await getAllWarehouses());
    })();
  }, []);

  const locationSelector = (id, warehouse) => {
    setSelectedWareHouse(id);
    setLocationPlaceholder(warehouse);
  };

  const refreshPeriodList = () => {
    (async () => {
      setPeriods(await getAllPeriods());
    })();
  };
  return (
    <div>
      <div className="flex xs:justify-between md:justify-start">
        <Dropdown
          data={warehouses.map((w) => ({ id: w.id, name: w.warehouse }))}
          handler={locationSelector}
          placeholder={locationPlaceholder}
        />
        <button
          type="button"
          className="xs:ml-4 btn"
          onClick={() => setTogglePeriodAdd()}
        >
          <PlusCircleIcon className="h-4 w-4 mr-2" />
          Add period
        </button>
      </div>
      {togglePeriodAdd
      && (
      <PeriodAddModal
        togglePeriodAdd={setTogglePeriodAdd}
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
