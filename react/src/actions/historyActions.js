import { createAction } from 'redux-actions';
import axios from 'axios';
import links from '../routes';

export {
  setMonitorMenu,
  setDashboardMenu,
  setHistoryMenu,
} from './menuActions';

export const getMeasurementsRequest = createAction('MEASUREMENTS_GET_REQUEST');
export const getMeasurementsFailed = createAction('MEASUREMENTS_GET_FAILED');
export const getMeasurementsSuccess = createAction('MEASUREMENTS_GET_SUCCESS');
export const getStatesRequest = createAction('States_GET_REQUEST');
export const getStatesFailed = createAction('States_GET_FAILED');
export const getStatesSuccess = createAction('States_GET_SUCCESS');
export const getErrorsListRequest = createAction('ERRORS_LIST_GET_REQUEST');
export const getErrorsListFailed = createAction('ERRORS_LIST_GET_FAILED');
export const getErrorsListSuccess = createAction('ERRORS_LIST_GET_SUCCESS');
export const getTransformersListRequest = createAction('TRANSFORMERSLIST_GET_REQUEST');
export const getTransformersListFailed = createAction('TRANSFORMERSLIST_GET_FAILED');
export const getTransformersListSuccess = createAction('TRANSFORMERSLIST_GET_SUCCESS');
export const getTransMeasurementsForGraphRequest = createAction('TRANSMEASUREMENTS_GET_REQUEST');
export const getTransMeasurementsForGraphFailed = createAction('TRANSMEASUREMENTS_GET_FAILED');
export const getTrans1MeasurementsForGraphSuccess = createAction('TRANSMEASUREMENTS1_GET_SUCCESS');
export const getTrans2MeasurementsForGraphSuccess = createAction('TRANSMEASUREMENTS2_GET_SUCCESS');
export const getTrans3MeasurementsForGraphSuccess = createAction('TRANSMEASUREMENTS3_GET_SUCCESS');
export const getTrans4MeasurementsForGraphSuccess = createAction('TRANSMEASUREMENTS4_GET_SUCCESS');

export const getErrorsList = () => async (dispatch) => {
  dispatch(getErrorsListRequest());
  try {
    const result = await axios.get(links.errorMeasurmentLink());
    dispatch(getErrorsListSuccess(result.data));
  } catch (error) {
    console.log('Error: ', error);
    dispatch(getErrorsListFailed());
  }
};

export const getTransformersList = () => async (dispatch) => {
  dispatch(getTransformersListRequest());
  try {
    const result = await axios.get(links.transformersListLink());
    // console.log('this is result: ', result);
    dispatch(getTransformersListSuccess(result.data));
  } catch (error) {
    console.log('Error: ', error);
    dispatch(getTransformersListFailed());
  }
};

export const getMeasurements = (id, data) => async (dispatch) => {
  dispatch(getMeasurementsRequest());
  try {
    const result = await axios.get(links.measurementLink(id), {
      params: data,
    });
    // console.log('this is result: ', result);
    dispatch(getMeasurementsSuccess(result.data));
  } catch (error) {
    console.log('error: ', error);
    dispatch(getMeasurementsFailed());
  }
};

export const getStates = (id, data) => async (dispatch) => {
  dispatch(getStatesRequest());
  try {
    console.log('this is data: ', data);
    const result = await axios.get(links.statesLink(id), {
      params: data,
    });
    // console.log('this is result: ', result);
    dispatch(getStatesSuccess(result.data));
  } catch (error) {
    console.log('error: ', error);
    dispatch(getStatesFailed());
  }
};

export const getTransMeasurementsForGraph = (id, data) => async (dispatch) => {
  dispatch(getTransMeasurementsForGraphRequest());
  try {
    const result = await axios.get(links.measurementLink(id), {
      params: data,
    });
    switch (id) {
      case 1:
        console.log('this is result 1: ', result.data);
        dispatch(getTrans1MeasurementsForGraphSuccess(result.data));
        break;
      case 2:
        console.log('this is result 2: ', result.data);
        dispatch(getTrans2MeasurementsForGraphSuccess(result.data));
        break;
      case 3:
        console.log('this is result 3: ', result.data);
        dispatch(getTrans3MeasurementsForGraphSuccess(result.data));
        break;
      case 4:
        console.log('this is result 4: ', result.data);
        dispatch(getTrans4MeasurementsForGraphSuccess(result.data));
        break;
      default:
        break;
    }
  } catch (error) {
    console.log('error: ', error);
    dispatch(getTransMeasurementsForGraphFailed());
  }
};
