import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import './assets/sass/style.scss';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter
      basename={
        process.env.NODE_ENV === 'production'
          ? '/e-commerce-deployment'
          : '/e-commerce'
      }
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
