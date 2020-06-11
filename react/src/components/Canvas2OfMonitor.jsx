import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  printTitle,
  drawCircle,
  drawLineForSwitch,
  drawLine,
  drawSmallRectangle,
  drawDataBox,
  dataForUIPF,
  dataForABMWh,
  dataForCosineHz,
} from './canvasLayoutofMonitor';
import * as actions from '../actions/transformersSocket';
import beepSound from '../utils/beep.mp3';

const audioElement = new Audio(beepSound);

const mapStateToProps = (state) => ({
  stateTrans3: state.wsTransHandler.stateTrans3,
  stateTrans4: state.wsTransHandler.stateTrans4,
  measurementsTrans3: state.wsTransHandler.measurementsTrans3,
  measurementsTrans4: state.wsTransHandler.measurementsTrans4,
  isTableLoadedForTrans3: state.wsTransHandler.isTableLoadedForTrans3,
  isTableLoadedForTrans4: state.wsTransHandler.isTableLoadedForTrans4,
});

@connect(mapStateToProps, actions)
class Canvas2 extends Component {
  componentDidMount = () => {
    const { canvas } = this.refs;
    const canvasID = canvas.getContext('2d');
    this.setState({
      canvasID,
    });
    this.drawCanvas();
  };

  componentDidUpdate = () => {
    this.drawCanvas();
  };

  state = {
    canvasID: '',
  }

  displayWarningValues = (warningValues, key, value) => {
    if (warningValues.includes(key)) {
      audioElement.play();
      return [value, 1];
    }
    return [value];
  };

  drawCanvas = () => {
    const {
      stateTrans3,
      stateTrans4,
      measurementsTrans3,
      measurementsTrans4,
      isTableLoadedForTrans3,
      isTableLoadedForTrans4,
    } = this.props;
    const { canvasID } = this.state;
    if (canvasID && isTableLoadedForTrans3 && isTableLoadedForTrans4) {
      canvasID.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
      printTitle(canvasID, 2, [87, 50]);
      drawCircle(canvasID, [135, 74]);
      drawCircle(canvasID, [135, 97]);
      drawLineForSwitch(canvasID, 'ВВ2', [136, 116, 136, 206, 115, 228], [30, 210, 30, 235],
        stateTrans3 ? 'green' : 'red');
      drawLine(canvasID, [136, 318, 136, 228, 115, 206], stateTrans3 ? 'green' : 'red');
      drawLineForSwitch(canvasID, 'АВР1', [136, 318, 344, 318, 366, 296], [280, 275, 360, 275], stateTrans3 === false && stateTrans4 === false ? 'red' : 'green');
      drawLine(canvasID, [574, 318, 366, 318, 344, 297], stateTrans3 === false && stateTrans4 === false ? 'red' : 'green');
      drawLine(canvasID, [574, 318, 574, 228, 553, 206], stateTrans4 ? 'green' : 'red');
      drawCircle(canvasID, [573, 74]);
      drawCircle(canvasID, [573, 97]);
      printTitle(canvasID, 2.1, [500, 50]);
      drawLineForSwitch(canvasID, 'ВВ1', [574, 116, 574, 206, 553, 228], [468, 210, 468, 235],
        stateTrans4 ? 'green' : 'red');
      drawLine(canvasID, [136, 318, 136, 422], stateTrans3 === false && stateTrans4 === false ? 'red' : 'green');
      drawSmallRectangle(canvasID, [103, 422, 70, 40, 112, 449]);
      drawLine(canvasID, [136, 462, 136, 540], stateTrans3 === false && stateTrans4 === false ? 'red' : 'green');
      drawLine(canvasID, [574, 318, 574, 422], stateTrans3 === false && stateTrans4 === false ? 'red' : 'green');
      drawSmallRectangle(canvasID, [541, 422, 70, 40, 550, 449]);
      drawLine(canvasID, [574, 462, 574, 540], stateTrans3 === false && stateTrans4 === false ? 'red' : 'green');
      drawLine(canvasID, [136, 540, 120, 525], stateTrans3 === false && stateTrans4 === false ? 'red' : 'green');
      drawLine(canvasID, [136, 540, 152, 525], stateTrans3 === false && stateTrans4 === false ? 'red' : 'green');
      drawLine(canvasID, [574, 540, 558, 525], stateTrans3 === false && stateTrans4 === false ? 'red' : 'green');
      drawLine(canvasID, [574, 540, 590, 525], stateTrans3 === false && stateTrans4 === false ? 'red' : 'green');
      drawDataBox(canvasID, [10, 550]);
      drawDataBox(canvasID, [410, 550]);
      dataForUIPF(canvasID, 'U', [90, 610]);
      dataForUIPF(canvasID, 'I', [180, 610]);
      dataForUIPF(canvasID, 'P', [260, 610]);
      dataForUIPF(canvasID, 'Ф1', [20, 650]);
      dataForUIPF(canvasID, 'Ф2', [20, 690]);
      dataForUIPF(canvasID, 'Ф3', [20, 730]);
      dataForABMWh(canvasID, 'Volt', [measurementsTrans3.is_warning ? this.displayWarningValues(measurementsTrans3.warning_values, 'u1', measurementsTrans3.u1) : [measurementsTrans3.u1], 55, 650]);
      dataForABMWh(canvasID, 'mA', [measurementsTrans3.is_warning ? this.displayWarningValues(measurementsTrans3.warning_values, 'i1', measurementsTrans3.i1) : [measurementsTrans3.i1], 155, 650]);
      dataForABMWh(canvasID, 'VA', [measurementsTrans3.is_warning ? this.displayWarningValues(measurementsTrans3.warning_values, 'p1', measurementsTrans3.p1) : [measurementsTrans3.p1], 248, 650]);
      dataForABMWh(canvasID, 'Volt', [measurementsTrans3.is_warning ? this.displayWarningValues(measurementsTrans3.warning_values, 'u2', measurementsTrans3.u2) : [measurementsTrans3.u2], 55, 690]);
      dataForABMWh(canvasID, 'mA', [measurementsTrans3.is_warning ? this.displayWarningValues(measurementsTrans3.warning_values, 'i2', measurementsTrans3.i2) : [measurementsTrans3.i2], 155, 690]);
      dataForABMWh(canvasID, 'VA', [measurementsTrans3.is_warning ? this.displayWarningValues(measurementsTrans3.warning_values, 'p2', measurementsTrans3.p2) : [measurementsTrans3.p2], 248, 690]);
      dataForABMWh(canvasID, 'Volt', [measurementsTrans3.is_warning ? this.displayWarningValues(measurementsTrans3.warning_values, 'u3', measurementsTrans3.u3) : [measurementsTrans3.u3], 55, 730]);
      dataForABMWh(canvasID, 'mA', [measurementsTrans3.is_warning ? this.displayWarningValues(measurementsTrans3.warning_values, 'i3', measurementsTrans3.i3) : [measurementsTrans3.i3], 155, 730]);
      dataForABMWh(canvasID, 'VA', [measurementsTrans3.is_warning ? this.displayWarningValues(measurementsTrans3.warning_values, 'p3', measurementsTrans3.p3) : [measurementsTrans3.p3], 248, 730]);
      dataForCosineHz(canvasID, 'f', [50, 30, 790]);
      dataForCosineHz(canvasID, 'cos', [0.92, 160, 790]);
      dataForUIPF(canvasID, 'U', [490, 610]);
      dataForUIPF(canvasID, 'I', [590, 610]);
      dataForUIPF(canvasID, 'P', [680, 610]);
      dataForUIPF(canvasID, 'Ф1', [420, 650]);
      dataForUIPF(canvasID, 'Ф2', [420, 690]);
      dataForUIPF(canvasID, 'Ф2', [420, 730]);
      dataForABMWh(canvasID, 'Volt', [measurementsTrans4.is_warning ? this.displayWarningValues(measurementsTrans4.warning_values, 'u1', measurementsTrans4.u1) : [measurementsTrans4.u1], 455, 650]);
      dataForABMWh(canvasID, 'mA', [measurementsTrans4.is_warning ? this.displayWarningValues(measurementsTrans4.warning_values, 'i1', measurementsTrans4.i1) : [measurementsTrans4.i1], 555, 650]);
      dataForABMWh(canvasID, 'VA', [measurementsTrans4.is_warning ? this.displayWarningValues(measurementsTrans4.warning_values, 'p1', measurementsTrans4.p1) : [measurementsTrans4.p1], 648, 650]);
      dataForABMWh(canvasID, 'Volt', [measurementsTrans4.is_warning ? this.displayWarningValues(measurementsTrans4.warning_values, 'u2', measurementsTrans4.u2) : [measurementsTrans4.u2], 455, 690]);
      dataForABMWh(canvasID, 'mA', [measurementsTrans4.is_warning ? this.displayWarningValues(measurementsTrans4.warning_values, 'i2', measurementsTrans4.i2) : [measurementsTrans4.i2], 555, 690]);
      dataForABMWh(canvasID, 'VA', [measurementsTrans4.is_warning ? this.displayWarningValues(measurementsTrans4.warning_values, 'p2', measurementsTrans4.p2) : [measurementsTrans4.p2], 648, 690]);
      dataForABMWh(canvasID, 'Volt', [measurementsTrans4.is_warning ? this.displayWarningValues(measurementsTrans4.warning_values, 'u3', measurementsTrans4.u3) : [measurementsTrans4.u3], 455, 730]);
      dataForABMWh(canvasID, 'mA', [measurementsTrans4.is_warning ? this.displayWarningValues(measurementsTrans4.warning_values, 'i3', measurementsTrans4.i3) : [measurementsTrans4.i3], 555, 730]);
      dataForABMWh(canvasID, 'VA', [measurementsTrans4.is_warning ? this.displayWarningValues(measurementsTrans4.warning_values, 'p3', measurementsTrans4.p3) : [measurementsTrans4.p3], 648, 730]);
      dataForCosineHz(canvasID, 'f', [50, 430, 790]);
      dataForCosineHz(canvasID, 'cos', [0.91, 560, 790]);
    }
  }

  render() {
    return (
      <canvas
        ref="canvas"
        width={800}
        height={900}
      />
    );
  }
}

export default Canvas2;
