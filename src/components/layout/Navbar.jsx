import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="flex space-x-4 px-8 py-4 bg-indigo-400 text-white">
      <Link to="/">Home</Link>
      <Link to="/calendar">Calendar</Link>
    </div>
  );
}
