import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Tabs,
} from 'antd';
import * as actions from '../actions/historyActions';
import Measurement from './MeasurementsHistory';
import States from './StatesHistory';
import Regular from '../utils/fonts/Roboto-Regular.ttf';


const { TabPane } = Tabs;

const mapStateToProps = (state) => ({
  errorList: state.historyHandler.errorList,
  isErrorListLoaded: state.historyHandler.isErrorListLoaded,
  transformersList: state.historyHandler.transformersList,
  isTransformersListLoaded: state.historyHandler.isTransformersListLoaded,
});

@connect(mapStateToProps, actions)
class History extends Component {
  componentDidMount = () => {
    const {
      getErrorsList,
      getTransformersList,
      setHistoryMenu,
    } = this.props;
    getErrorsList();
    getTransformersList();
    setHistoryMenu();
  }

  render() {
    return (
      <div>
        <div style={{
          backgroundColor: 'white',
          marginLeft: 40,
          marginRight: 40,
          padding: 15,
          fontFamily: Regular,
        }}>
          <Tabs onChange={this.handleTabs} type="card">
            <TabPane tab='Измерения' key="1">
             <Measurement {...this.props} />
            </TabPane>
            <TabPane tab="Состояния" key="2">
            <States {...this.props} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default History;
