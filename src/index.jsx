import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/layout/Navbar';
import './index.css';
import Home from './pages/Home';

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <Home />
  </React.StrictMode>,
  document.getElementById('root'),
);
