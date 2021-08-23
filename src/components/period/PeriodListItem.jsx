/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Edit from './Edit';
import Period from './Period';

export default function PeriodListItem({ period }) {
  const [showEdit, setShowEdit] = useState(false);
  function toggleEdit() {
    setShowEdit(!showEdit);
  }

  return (
    <>
      {showEdit && <Edit period={period} toggleEdit={() => toggleEdit()} />}
      <Period period={period} toggleEdit={() => toggleEdit()} />
    </>
  );
}
