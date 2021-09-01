import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import './index.css';
import Calendar from './pages/Calendar';
import Home from './pages/Home';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="xs:px-6 xs:py-8 lg:px-8 lg:py-4">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/calendar" component={Calendar} />
          </Switch>
        </div>
      </div>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root'),
);
