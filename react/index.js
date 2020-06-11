import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import links from './src/routes';
import App from './src/App';
import rootReducer from './src/reducers/rootReducer';
import {
  wsForTrans1,
  wsForTrans2,
  wsForTrans3,
  wsForTrans4,
} from './src/actions/transformersSocket';
import 'antd/dist/antd.css';
import './src/utils/index.css';

const initialValue = {
  menuHandler: {
    navMenu: 'monitorNetwork',
  },

  wsTransHandler: {
    isTableLoadedForTrans1: false,
    isTableLoadedForTrans2: false,
    isTableLoadedForTrans3: false,
    isTableLoadedForTrans4: false,
    // measurementsTrans1: { u1: '0' },
    trans1MeasurementsForGraph: [{
      time: null,
    }],
  },
};
/* eslint-disable */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const store = createStore(rootReducer, initialValue, composeEnhancers(applyMiddleware(thunk)));

const websocketTrans1 = new WebSocket(links.wsLink('t1_1'));
const websocketTrans2 = new WebSocket(links.wsLink('t1_2'));
const websocketTrans3 = new WebSocket(links.wsLink('t2_1'));
const websocketTrans4 = new WebSocket(links.wsLink('t2_2'));

websocketTrans1.onmessage = (event) => {
  store.dispatch(wsForTrans1(JSON.parse(event.data)));
};
websocketTrans2.onmessage = (event) => {
  store.dispatch(wsForTrans2(JSON.parse(event.data)));
};
websocketTrans3.onmessage = (event) => {
  store.dispatch(wsForTrans3(JSON.parse(event.data)));
};
websocketTrans4.onmessage = (event) => {
  store.dispatch(wsForTrans4(JSON.parse(event.data)));
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
