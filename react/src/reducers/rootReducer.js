import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import * as actions from '../actions/menuActions';
import wsTransHandler from './wsTransHandler';
import historyHandler from './historyHandler';

const menuHandler = handleActions({
  [actions.setHistoryMenu](state) {
    return {
      ...state,
      navMenu: 'history',
    };
  },
  [actions.setMonitorMenu](state) {
    return {
      ...state,
      navMenu: 'monitorNetwork',
    };
  },
  [actions.setDashboardMenu](state) {
    return {
      ...state,
      navMenu: 'dashboard',
    };
  },
}, {

});

export default combineReducers({
  menuHandler,
  wsTransHandler,
  historyHandler,
});
