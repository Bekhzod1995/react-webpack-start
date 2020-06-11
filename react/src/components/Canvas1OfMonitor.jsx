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
import * as actions from '../actions/menuActions';
import beepSound from '../utils/beep.mp3';

const audioElement = new Audio(beepSound);

const mapStateToProps = (state) => ({
  measurementsTrans1: state.wsTransHandler.measurementsTrans1,
  measurementsTrans2: state.wsTransHandler.measurementsTrans2,
  stateTrans1: state.wsTransHandler.stateTrans1,
  stateTrans2: state.wsTransHandler.stateTrans2,
  isTableLoadedForTrans1: state.wsTransHandler.isTableLoadedForTrans1,
  isTableLoadedForTrans2: state.wsTransHandler.isTableLoadedForTrans2,
});

@connect(mapStateToProps, actions)
class Canvas1 extends Component {
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

  drawCanvas = async () => {
    const {
      measurementsTrans1,
      measurementsTrans2,
      stateTrans1,
      stateTrans2,
      isTableLoadedForTrans1,
      isTableLoadedForTrans2,
    } = this.props;
    const { canvasID } = this.state;
    if (isTableLoadedForTrans1 && isTableLoadedForTrans2 && canvasID) {
      canvasID.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
      printTitle(canvasID, 1, [87, 50]);
      drawCircle(canvasID, [135, 74]);
      drawCircle(canvasID, [135, 97]);
      console.log('777: ', stateTrans1);
      drawLineForSwitch(canvasID, 'ВВ2', [136, 116, 136, 206, 115, 228], [30, 210, 30, 235],
        stateTrans1 ? 'green' : 'red');
      drawLine(canvasID, [136, 318, 136, 228, 115, 206], stateTrans1 ? 'green' : 'red');
      drawLineForSwitch(canvasID, 'АВР1', [136, 318, 344, 318, 366, 296], [280, 275, 360, 275], stateTrans1 === false && stateTrans2 === false ? 'red' : 'green');
      drawLine(canvasID, [574, 318, 366, 318, 344, 297], stateTrans1 === false && stateTrans2 === false ? 'red' : 'green');
      drawLine(canvasID, [574, 318, 574, 228, 553, 206], stateTrans2 ? 'green' : 'red');
      drawCircle(canvasID, [573, 74]);
      drawCircle(canvasID, [573, 97]);
      printTitle(canvasID, 1.1, [500, 50]);
      drawLineForSwitch(canvasID, 'ВВ1', [574, 116, 574, 206, 553, 228], [468, 210, 468, 235],
        stateTrans2 ? 'green' : 'red');
      drawLine(canvasID, [136, 318, 136, 422], stateTrans1 === false && stateTrans2 === false ? 'red' : 'green');
      drawSmallRectangle(canvasID, [103, 422, 70, 40, 112, 449]);
      drawLine(canvasID, [136, 462, 136, 540], stateTrans1 === false && stateTrans2 === false ? 'red' : 'green');
      drawLine(canvasID, [574, 318, 574, 422], stateTrans1 === false && stateTrans2 === false ? 'red' : 'green');
      drawSmallRectangle(canvasID, [541, 422, 70, 40, 550, 449]);
      drawLine(canvasID, [574, 462, 574, 540], stateTrans1 === false && stateTrans2 === false ? 'red' : 'green');
      drawLine(canvasID, [136, 540, 120, 525], stateTrans1 === false && stateTrans2 === false ? 'red' : 'green');
      drawLine(canvasID, [136, 540, 152, 525], stateTrans1 === false && stateTrans2 === false ? 'red' : 'green');
      drawLine(canvasID, [574, 540, 558, 525], stateTrans1 === false && stateTrans2 === false ? 'red' : 'green');
      drawLine(canvasID, [574, 540, 590, 525], stateTrans1 === false && stateTrans2 === false ? 'red' : 'green');
      drawDataBox(canvasID, [1, 550]);
      drawDataBox(canvasID, [401, 550]);
      dataForUIPF(canvasID, 'U', [90, 610]);
      dataForUIPF(canvasID, 'I', [180, 610]);
      dataForUIPF(canvasID, 'P', [260, 610]);
      dataForUIPF(canvasID, 'Ф1', [10, 650]);
      dataForUIPF(canvasID, 'Ф2', [10, 690]);
      dataForUIPF(canvasID, 'Ф3', [10, 730]);
      dataForUIPF(canvasID, 'U', [480, 610]);
      dataForUIPF(canvasID, 'I', [590, 610]);
      dataForUIPF(canvasID, 'P', [680, 610]);
      dataForUIPF(canvasID, 'Ф1', [410, 650]);
      dataForUIPF(canvasID, 'Ф2', [410, 690]);
      dataForUIPF(canvasID, 'Ф2', [410, 730]);
      dataForABMWh(canvasID, 'Volt', [measurementsTrans2.is_warning ? this.displayWarningValues(measurementsTrans2.warning_values, 'u1', measurementsTrans2.u1) : [measurementsTrans2.u1], 450, 650]);
      dataForABMWh(canvasID, 'mA', [measurementsTrans2.is_warning ? this.displayWarningValues(measurementsTrans2.warning_values, 'i1', measurementsTrans2.i1) : [measurementsTrans2.i1], 555, 650]);
      dataForABMWh(canvasID, 'VA', [measurementsTrans2.is_warning ? this.displayWarningValues(measurementsTrans2.warning_values, 'p1', measurementsTrans2.p1) : [measurementsTrans2.p1], 648, 650]);
      dataForABMWh(canvasID, 'Volt', [measurementsTrans2.is_warning ? this.displayWarningValues(measurementsTrans2.warning_values, 'u2', measurementsTrans2.u2) : [measurementsTrans2.u2], 450, 690]);
      dataForABMWh(canvasID, 'mA', [measurementsTrans2.is_warning ? this.displayWarningValues(measurementsTrans2.warning_values, 'i2', measurementsTrans2.i2) : [measurementsTrans2.i2], 555, 690]);
      dataForABMWh(canvasID, 'VA', [measurementsTrans2.is_warning ? this.displayWarningValues(measurementsTrans2.warning_values, 'p2', measurementsTrans2.p2) : [measurementsTrans2.p2], 648, 690]);
      dataForABMWh(canvasID, 'Volt', [measurementsTrans2.is_warning ? this.displayWarningValues(measurementsTrans2.warning_values, 'u3', measurementsTrans2.u3) : [measurementsTrans2.u3], 450, 730]);
      dataForABMWh(canvasID, 'mA', [measurementsTrans2.is_warning ? this.displayWarningValues(measurementsTrans2.warning_values, 'i3', measurementsTrans2.i3) : [measurementsTrans2.i3], 555, 730]);
      dataForABMWh(canvasID, 'VA', [measurementsTrans2.is_warning ? this.displayWarningValues(measurementsTrans2.warning_values, 'p3', measurementsTrans2.p3) : [measurementsTrans2.p3], 648, 730]);
      dataForCosineHz(canvasID, 'f', [50, 430, 790]);
      dataForCosineHz(canvasID, 'cos', [0.91, 560, 790]);


      dataForABMWh(canvasID, 'Volt', [measurementsTrans1.is_warning ? this.displayWarningValues(measurementsTrans1.warning_values, 'u1', measurementsTrans1.u1) : [measurementsTrans1.u1], 50, 650]);
      dataForABMWh(canvasID, 'mA', [measurementsTrans1.is_warning ? this.displayWarningValues(measurementsTrans1.warning_values, 'i1', measurementsTrans1.i1) : [measurementsTrans1.i1], 155, 650]);
      dataForABMWh(canvasID, 'VA', [measurementsTrans1.is_warning ? this.displayWarningValues(measurementsTrans1.warning_values, 'p1', measurementsTrans1.p1) : [measurementsTrans1.p1], 248, 650]);
      dataForABMWh(canvasID, 'Volt', [measurementsTrans1.is_warning ? this.displayWarningValues(measurementsTrans1.warning_values, 'u2', measurementsTrans1.u2) : [measurementsTrans1.u2], 50, 690]);
      dataForABMWh(canvasID, 'mA', [measurementsTrans1.is_warning ? this.displayWarningValues(measurementsTrans1.warning_values, 'i2', measurementsTrans1.i2) : [measurementsTrans1.i2], 155, 690]);
      dataForABMWh(canvasID, 'VA', [measurementsTrans1.is_warning ? this.displayWarningValues(measurementsTrans1.warning_values, 'p2', measurementsTrans1.p2) : [measurementsTrans1.p2], 248, 690]);
      dataForABMWh(canvasID, 'Volt', [measurementsTrans1.is_warning ? this.displayWarningValues(measurementsTrans1.warning_values, 'u3', measurementsTrans1.u3) : [measurementsTrans1.u3], 50, 730]);
      dataForABMWh(canvasID, 'mA', [measurementsTrans1.is_warning ? this.displayWarningValues(measurementsTrans1.warning_values, 'i3', measurementsTrans1.i3) : [measurementsTrans1.i3], 155, 730]);
      dataForABMWh(canvasID, 'VA', [measurementsTrans1.is_warning ? this.displayWarningValues(measurementsTrans1.warning_values, 'p3', measurementsTrans1.p3) : [measurementsTrans1.p3], 248, 730]);
      dataForCosineHz(canvasID, 'f', [50, 30, 790]);
      dataForCosineHz(canvasID, 'cos', [0.92, 160, 790]);
    }
  }

  render() {
    return (
      <>
        <canvas
          ref="canvas"
          width={800}
          height={900}
        />
      </>
    );
  }
}

export default Canvas1;
