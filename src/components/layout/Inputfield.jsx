import React from 'react';

export default function Inputfield({
  type, placeholder, value, handler, focusRef,
}) {
  return (
    <div className="py-2">
      <input
        type={type || 'text'}
        name={`inpt-${placeholder}`}
        id={`inpt-${placeholder}`}
        className="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500  w-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 rounded-md"
        placeholder={placeholder}
        value={value}
        onChange={handler}
        ref={focusRef}
      />
    </div>
  );
}
