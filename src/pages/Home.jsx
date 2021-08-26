import React from 'react';
import Dropdown from '../components/layout/Dropdown';
import PeriodList from '../components/period/PeriodList';

export default function Home() {
  return (
    <div className="h-screen bg-gray-100 sm:px-6 lg:px-8">
      <Dropdown />
      <PeriodList />
    </div>
  );
}
