import { createAction } from 'redux-actions';

export {
  wsForTrans1,
  wsForTrans2,
  wsForTrans3,
  wsForTrans4,
} from './transformersSocket';

export const setMonitorMenu = createAction('MENU_MONITOR_SET');
export const setHistoryMenu = createAction('MENU_HISTORY_SET');
export const setDashboardMenu = createAction('MENU_Dashboard_SET');
