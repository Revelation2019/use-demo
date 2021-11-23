import { Provider } from 'mobx-react';
import stores from './store';
import { renderRoutes } from 'react-router-config';
import routes from './config/routes';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

ReactDOM.render(
  <HashRouter>
    <Provider {...stores}>
      {renderRoutes(routes)}
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);
