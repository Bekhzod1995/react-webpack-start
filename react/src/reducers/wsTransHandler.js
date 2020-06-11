import { handleActions } from 'redux-actions';
import * as actions from '../actions/transformersSocket';

/* eslint-disable */
const wsTransHandler = handleActions({
  [actions.getWsMeasurementTrans1] (state, { payload }) {
    return {
      ...state,
      measurementsTrans1: payload,
      isTableLoadedForTrans1: true,
    }
  },
  [actions.getWsMeasurementTrans2] (state, { payload }) {
    return {
      ...state,
      measurementsTrans2: payload,
      isTableLoadedForTrans2: true
    };
  },
  [actions.getWsMeasurementTrans3] (state, { payload }) {
    return {
      ...state,
      measurementsTrans3: payload,
      isTableLoadedForTrans3: true
    };
  },
  [actions.getWsMeasurementTrans4] (state, { payload }) {
    return {
      ...state,
      measurementsTrans4: payload,
      isTableLoadedForTrans4: true
    };
  },
  [actions.getWsStateTrans1] (state, { payload }) {
    const { is_active } = payload;
    return {
      ...state,
      stateTrans1: is_active,
    };
  },
  [actions.getWsStateTrans2] (state, { payload }) {
    const { is_active } = payload;
    return {
      ...state,
      stateTrans2: is_active,
    };
  },
  [actions.getWsStateTrans3] (state, { payload }) {
    const { is_active } = payload;
    return {
      ...state,
      stateTrans3: is_active,
    };
  },
  [actions.getWsStateTrans4] (state, { payload }) {
    const { is_active } = payload;
    return {
      ...state,
      stateTrans4: is_active,
    };
  }
}, {
});

export default wsTransHandler;
