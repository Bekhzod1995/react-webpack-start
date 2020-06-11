import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/menuActions';
import Canvas1 from './Canvas1OfMonitor';
import Canvas2 from './Canvas2OfMonitor';


@connect(null, actions)
class MonitorTransformers extends Component {
  componentDidMount = () => {
    const { setMonitorMenu } = this.props;
    setMonitorMenu();
  };

  render() {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Canvas1 />
          <Canvas2 />
        </div>
      </>
    );
  }
}

export default MonitorTransformers;
