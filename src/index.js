import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import App2 from './App2';
// import EventManagerDataProvider from './contextdata/ContextData';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route path='/*' element={<App />} />
          <Route path='/user/:id/*' element={<App2 />} />
        </Routes>
    </Router>
  </React.StrictMode>
);
