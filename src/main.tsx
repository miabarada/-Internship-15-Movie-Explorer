import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
