import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import getAllPeriods from '../service/PeriodService';
import Dropdown from '../components/layout/Dropdown';
import PeriodList from '../components/period/PeriodList';

export default function Home() {
  const [periods, setPeriods] = useState([]);
  const [wareHouses, setWareHouses] = useState([]);
  const [selectedWareHouse, setSelectedWareHouse] = useState(-1);

  useEffect(() => {
    (async () => {
      const data = await getAllPeriods();
      setPeriods(data);
      const uniqueWarehouses = _.uniqBy(periods.map((p) => ({ id: p.warehouseId, name: p.name })), 'id');
      setWareHouses([{ id: -1, name: 'Vis alle' }, ...uniqueWarehouses]);
    })();
  }, []);

  function locationSelector(id) {
    setSelectedWareHouse(id);
  }

  return (
    <div className="sm:px-6 lg:px-8 pt-4 h-screen bg-gray-100">
      <Dropdown data={wareHouses} handler={locationSelector} />
      {selectedWareHouse >= 0
        ? <PeriodList periods={periods.filter((p) => p.warehouseId === selectedWareHouse)} />
        : <PeriodList periods={periods} />}
    </div>
  );
}
