import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import ContextConsumer from './Context/Context';
import { BrowserRouter as Router } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('ECOMMERCEAPP'));
root.render(
  <ContextConsumer>
    <Router>
      <App />
    </Router>
  </ContextConsumer>
);