import { handleActions } from 'redux-actions';
// import _ from 'lodash';
import * as actions1 from '../actions/historyActions';
import * as actions2 from '../actions/transformersSocket';

const actions = {
  ...actions1,
  ...actions2,
};


const historyHandler = handleActions({
  [actions.getMeasurementsSuccess](state, { payload }) {
    const results = payload;
    return {
      ...state,
      dataForMeasurements: results,
      isMeasurementsLoaded: true,
    };
  },
  [actions.getMeasurementsFailed](state) {
    return {
      ...state,
      isMeasurementsLoaded: true,
    };
  },
  [actions.getMeasurementsRequest](state) {
    return {
      ...state,
      isMeasurementsLoaded: false,
    };
  },
  [actions.getTrans1MeasurementsForGraphSuccess](state, { payload }) {
    const { results } = payload;
    return {
      ...state,
      graphMeasurements1: results,
      isMeasurementsLoaded: true,
    };
  },
  [actions.getTrans2MeasurementsForGraphSuccess](state, { payload }) {
    const { results } = payload;
    return {
      ...state,
      graphMeasurements2: results,
      isMeasurementsLoaded: true,
    };
  },
  [actions.getTrans3MeasurementsForGraphSuccess](state, { payload }) {
    const { results } = payload;
    return {
      ...state,
      graphMeasurements3: results,
      isMeasurementsLoaded: true,
    };
  },
  [actions.getTrans4MeasurementsForGraphSuccess](state, { payload }) {
    const { results } = payload;
    return {
      ...state,
      graphMeasurements4: results,
      isMeasurementsLoaded: true,
    };
  },
  [actions.getTransMeasurementsForGraphFailed](state) {
    return {
      ...state,
      isMeasurementsLoaded: true,
    };
  },
  [actions.getTransMeasurementsForGraphRequest](state) {
    return {
      ...state,
      isMeasurementsLoaded: false,
    };
  },
  [actions.getStatesSuccess](state, { payload }) {
    const results = payload;
    return {
      ...state,
      dataForStates: results,
      isStatesLoaded: true,
    };
  },
  [actions.getStatesFailed](state) {
    return {
      ...state,
      isStatesLoaded: true,
    };
  },
  [actions.getStatesRequest](state) {
    return {
      ...state,
      isStatesLoaded: false,
    };
  },
  [actions.getErrorsListRequest](state) {
    return {
      ...state,
      isErrorListLoaded: false,
    };
  },
  [actions.getErrorsListFailed](state) {
    return {
      ...state,
      isErrorListLoaded: true,
    };
  },
  [actions.getErrorsListSuccess](state, { payload }) {
    return {
      ...state,
      isErrorListLoaded: true,
      errorList: payload,
    };
  },
  [actions.getTransformersListSuccess](state, { payload }) {
    const { results } = payload;
    return {
      ...state,
      isTransformersListLoaded: true,
      transformersList: results,
    };
  },
  [actions.getTransformersListRequest](state) {
    return {
      ...state,
      isTransformersListLoaded: false,
    };
  },
  [actions.getTransformersListFailed](state) {
    return {
      ...state,
      isTransformersListLoaded: true,
    };
  },
  [actions.getWsMeasurementTrans1](state, { payload }) {
    const { graphMeasurements1 } = state;
    return {
      ...state,
      graphMeasurements1: [...graphMeasurements1, payload].filter(
        (data) => Date.parse(data.time) >= Date.now() - 120000,
      ),
      xDomain1: [Date.now() - 120000, Date.now()],
    };
  },
  [actions.getWsMeasurementTrans2](state, { payload }) {
    const { graphMeasurements2 } = state;
    return {
      ...state,
      graphMeasurements2: [...graphMeasurements2, payload].filter(
        (data) => Date.parse(data.time) >= Date.now() - 120000,
      ),
      xDomain2: [Date.now() - 120000, Date.now()],
    };
  },
  [actions.getWsMeasurementTrans3](state, { payload }) {
    const { graphMeasurements3 } = state;
    return {
      ...state,
      graphMeasurements3: [...graphMeasurements3, payload].filter(
        (data) => Date.parse(data.time) >= Date.now() - 120000,
      ),
      xDomain3: [Date.now() - 120000, Date.now()],
    };
  },
  [actions.getWsMeasurementTrans4](state, { payload }) {
    const { graphMeasurements4 } = state;
    return {
      ...state,
      graphMeasurements4: [...graphMeasurements4, payload].filter(
        (data) => Date.parse(data.time) >= Date.now() - 120000,
      ),
      xDomain4: [Date.now() - 120000, Date.now()],
    };
  },
}, {
  isMeasurementsLoaded: true,
  isStatesLoaded: true,
  graphMeasurements1: [{
    time: null,
  }],
  graphMeasurements2: [{
    time: null,
  }],
  graphMeasurements3: [{
    time: null,
  }],
  graphMeasurements4: [{
    time: null,
  }],
  xDomain1: [null, null],
  xDomain2: [null, null],
  xDomain3: [null, null],
  xDomain4: [null, null],
  // showedFromEndpoint: false,
});

export default historyHandler;
