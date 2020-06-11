
import React, { Component } from 'react';
import {
  XYPlot,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  DiscreteColorLegend,
} from 'react-vis';
import { curveCatmullRom } from 'd3-shape';
import '../../../node_modules/react-vis/dist/style.css';
import { connect } from 'react-redux';
import * as actions from '../actions/menuActions';

@connect(null, actions)
class Graph extends Component {
  componentDidMount = () => {
    const { setDashboardMenu } = this.props;

    setDashboardMenu();
  }

  appendLeadingZeroes = (number) => {
    if (number <= 9) {
      return `0${number}`;
    }
    return number;
  };

  myFormatter = (value) => (
    <tspan>
      <tspan x="0" dy="1em">
        {this.appendLeadingZeroes(
          new Date(value).getMinutes(),
        )}:{this.appendLeadingZeroes(
          new Date(value).getSeconds(),
        )}
      </tspan>
    </tspan>
  );

  printGraphData = (number) => {
    const { graphMeasurements } = this.props;
    if (number === 1) {
      const result = graphMeasurements.map((data) => (
        {
          x: new Date(data.time).getTime(),
          y: data.u1,
        }
      ));
      return result;
    }
    if (number === 2) {
      const result = graphMeasurements.map((data) => (
        {
          x: new Date(data.time).getTime(),
          y: data.u2,
        }
      ));
      return result;
    }
    if (number === 3) {
      const result = graphMeasurements.map((data) => (
        {
          x: new Date(data.time).getTime(),
          y: data.u3,
        }
      ));
      return result;
    }
    return null;
  }

  drawReferenceLine = (number) => {
    const { xDomain } = this.props;
    // console.log('***: ', graphMeasurements);
    return [{
      x: xDomain[0],
      y: number,
    },
    {
      x: xDomain[1],
      y: number,
    }];
  }

  descriptions = [
    { title: 'U1', color: 'blue' },
    { title: 'U2', color: 'yellow', strokeStyle: 'dashed' },
    { title: 'U3', color: 'Purple' },
  ];

  render() {
    const { transformerName } = this.props;
    return (
     <div style={{ backgroundColor: 'white', width: 700 }}>
     <div style={{ display: 'flex' }}>
     <DiscreteColorLegend
        orientation="horizontal"
        width={300}
        items={this.descriptions}
      />
      <h3>{transformerName}</h3>
     </div>
      <XYPlot
        // Xtype='time'
        width={650}
        height={370}
        yDomain={[0, 400]}
        xDomain={[Date.now() - 120000, Date.now()]}
        // xDomain={xDomain}
      >
        <HorizontalGridLines
          style={{ stroke: '#B7E9ED' }}
        />
        <VerticalGridLines
          style={{ stroke: '#B7E9ED' }}
        />
        <XAxis
          tickFormat={this.myFormatter}
          style={{
            line: { stroke: '#ADDDE1' },
            ticks: { stroke: '#ADDDE1' },
            text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 },
          }}
        />
        <YAxis
          title='Voltage'
        // tickTotal={30}
        />
        <LineSeries
          data={this.printGraphData(1)}
          style={{
            strokeLinejoin: 'round',
          }}
          color="blue"
        />
        <LineSeries
          data={this.printGraphData(2)}
          color="yellow"
          strokeDasharray="7, 3"
          curve={'curveMonotoneX'}
        />
        <LineSeries
          data={this.printGraphData(3)}
          curve={curveCatmullRom.alpha(0.5)}
          color="purple"
        />
        {/* <LineSeries
          data={this.drawReferenceLine(231)}
          color="red"
          style={{
            strokeWidth: 3,
          }}
        />
        <LineSeries
          data={this.drawReferenceLine(209)}
          color="green"
          style={{
            strokeWidth: 3,
          }}
        /> */}
      </XYPlot>
      </div>
    );
  }
}

export default Graph;
