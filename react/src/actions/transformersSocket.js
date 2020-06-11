import { createAction } from 'redux-actions';

export const getWsStateTrans1 = createAction('STATE_TRANS1_WS_GET');
export const getWsStateTrans2 = createAction('STATE_TRANS2_WS_GET');
export const getWsStateTrans3 = createAction('STATE_TRANS3_WS_GET');
export const getWsStateTrans4 = createAction('STATE_TRANS4_WS_GET');
export const getWsMeasurementTrans1 = createAction('MEASUREMENT_TRANS1_WS_GET');
export const getWsMeasurementTrans2 = createAction('MEASUREMENT_TRANS2_WS_GET');
export const getWsMeasurementTrans3 = createAction('MEASUREMENT_TRANS3_WS_GET');
export const getWsMeasurementTrans4 = createAction('MEASUREMENT_TRANS4_WS_GET');

export const wsForTrans1 = ({ type, data }) => (dispatch) => {
  if (type === 'measurement') {
    dispatch(getWsMeasurementTrans1(data));
  } else {
    dispatch(getWsStateTrans1(data));
  }
};
export const wsForTrans2 = ({ type, data }) => (dispatch) => {
  if (type === 'measurement') {
    dispatch(getWsMeasurementTrans2(data));
  } else {
    dispatch(getWsStateTrans2(data));
  }
};
export const wsForTrans3 = ({ type, data }) => (dispatch) => {
  if (type === 'measurement') {
    dispatch(getWsMeasurementTrans3(data));
  } else {
    dispatch(getWsStateTrans3(data));
  }
};
export const wsForTrans4 = ({ type, data }) => (dispatch) => {
  if (type === 'measurement') {
    dispatch(getWsMeasurementTrans4(data));
  } else {
    dispatch(getWsStateTrans4(data));
  }
};
