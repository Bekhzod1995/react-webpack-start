
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/historyActions';
import Graph from './RealTimeGraph';


const mapStateToProps = (state) => ({
  graphMeasurements1: state.historyHandler.graphMeasurements1,
  graphMeasurements2: state.historyHandler.graphMeasurements2,
  graphMeasurements3: state.historyHandler.graphMeasurements3,
  graphMeasurements4: state.historyHandler.graphMeasurements4,
  isTableLoadedForTrans1: state.wsTransHandler.isTableLoadedForTrans1,
  xDomain1: state.historyHandler.xDomain1,
  xDomain2: state.historyHandler.xDomain2,
  xDomain3: state.historyHandler.xDomain3,
  xDomain4: state.historyHandler.xDomain4,
});


@connect(mapStateToProps, actions)
class Settings extends Component {
  componentDidMount = () => {
    const { setDashboardMenu } = this.props;

    setDashboardMenu();
  };

  state = {
    currentTime: new Date(),
    newTime: new Date(Date.now() - 120000),
    showedFromEndpoint: false,
  }

  getGraphData = (transformNumber, state) => {
    const { getTransMeasurementsForGraph } = this.props;
    const { currentTime, newTime } = state;
    getTransMeasurementsForGraph(transformNumber, {
      time_after: `${newTime.getFullYear()}-${this.appendLeadingZeroes(newTime.getMonth() + 1)}-${this.appendLeadingZeroes(newTime.getDate())} ${this.appendLeadingZeroes(newTime.getHours())}:${this.appendLeadingZeroes(newTime.getMinutes())}:${this.appendLeadingZeroes(newTime.getSeconds())}`,
      time_before: `${currentTime.getFullYear()}-${this.appendLeadingZeroes(currentTime.getMonth() + 1)}-${this.appendLeadingZeroes(currentTime.getDate())} ${this.appendLeadingZeroes(currentTime.getHours())}:${this.appendLeadingZeroes(currentTime.getMinutes())}:${this.appendLeadingZeroes(currentTime.getSeconds())}`,
    });
  };

  appendLeadingZeroes = (number) => {
    if (number <= 9) {
      return `0${number}`;
    }
    return number;
  };

  render() {
    const {
      graphMeasurements1,
      graphMeasurements2,
      graphMeasurements3,
      graphMeasurements4,
      xDomain1,
      xDomain2,
      xDomain3,
      xDomain4,
    } = this.props;
    return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
      }}>
      <Graph transformerName="ТП 1.1" graphMeasurements={graphMeasurements1} xDomain={xDomain1} />
      <Graph transformerName="ТП 1.2" graphMeasurements={graphMeasurements2} xDomain={xDomain2}/>
      </div>
      <br/>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
      }}>
      <Graph transformerName="ТП 2.1" graphMeasurements={graphMeasurements3} xDomain={xDomain3}/>
      <Graph transformerName="ТП 2.2" graphMeasurements={graphMeasurements4} xDomain={xDomain4}/>
      </div>
    </div>
    // return (
    // <div>
    //   <div style={{
    //     display: 'flex',
    //     justifyContent: 'space-around',
    //   }}>
    //   <Graph transformerName="ТП 1.1" graphMeasurements={graphMeasurements1} />
    //   <Graph transformerName="ТП 1.2" graphMeasurements={graphMeasurements2} />
    //   </div>
    //   <br/>
    //   <div style={{
    //     display: 'flex',
    //     justifyContent: 'space-around',
    //   }}>
    //   <Graph transformerName="ТП 2.1" graphMeasurements={graphMeasurements3} />
    //   <Graph transformerName="ТП 2.2" graphMeasurements={graphMeasurements4} />
    //   </div>
    // </div>
    );
  }
}

export default Settings;
