import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 1. Import this
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Wrap App here. This allows useLocation to work inside App.jsx */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);