import ReactDOM from 'react-dom/client';
import './scss/App.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import ContextConsumer from './Context/ContextConsumer';
import { BrowserRouter as Router } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextConsumer>
    <Router>
      <App />
    </Router>
  </ContextConsumer>
);