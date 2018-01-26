import React from 'react';
import ReactDOM from 'react-dom';
import { geoMercator, geoPath } from 'd3-geo';
import { Provider } from 'react-redux';

import App from './App';
import doFetch from './utils/doFetch';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

let store;

const renderApp = (appProps) => {
  ReactDOM.render(
    <Provider store={store}>
      <App { ...appProps } />
    </Provider>, 
    document.getElementById('root')
  );
};

initialize();

// initialization phase

function initialize() {
  const width = 800;
  const height = 800;
  const projection = geoMercator()
    .scale(300000)
    .rotate([122.431297, 0])
    .center([0, 37.773972])
    .translate([width / 2, height / 2]);
  const pathGenerator = geoPath().projection(projection);

  store = configureStore();
  doFetch.init(store);
  renderApp({ projection, pathGenerator });

  registerServiceWorker();
}





