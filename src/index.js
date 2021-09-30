import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Routes from './router/Routes';
import ApiService from './helpers/ApiServices';
import { UserContextProvider } from './components/states/contexts/UserContext';


ApiService.init();

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

