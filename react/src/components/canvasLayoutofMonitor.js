/* eslint-disable */

export const printTitle = (nameOfCurrCanvas, numOfTP, arrayOfCoordinations) => {
  nameOfCurrCanvas.beginPath();
  nameOfCurrCanvas.lineWidth = 3;
  nameOfCurrCanvas.setLineDash([]);
  nameOfCurrCanvas.font = '40px sans-serif';
  nameOfCurrCanvas.fillStyle = 'white';
  nameOfCurrCanvas.fillText(`ТП ${numOfTP}`, arrayOfCoordinations[0], arrayOfCoordinations[1]);
  nameOfCurrCanvas.stroke();
  nameOfCurrCanvas.closePath();
};

export const drawCircle = (nameOfCurrCanvas, arrayOfCoordinations) => {
  nameOfCurrCanvas.beginPath();
  nameOfCurrCanvas.lineWidth = 3;
  nameOfCurrCanvas.setLineDash([]);
  nameOfCurrCanvas.arc(arrayOfCoordinations[0], arrayOfCoordinations[1], 18, 0, 2 * Math.PI);
  nameOfCurrCanvas.strokeStyle = 'white';
  nameOfCurrCanvas.stroke();
  nameOfCurrCanvas.closePath();
};

export const drawLineForSwitch = (
  nameOfCurrCanvas,
  nameOfSwitch,
  arrayOfCoordinations,
  arrayOfCoordinationsForOnOff,
  flag,
) => {
  nameOfCurrCanvas.beginPath();
  nameOfCurrCanvas.lineWidth = 3;
  nameOfCurrCanvas.setLineDash([]);
  nameOfCurrCanvas.moveTo(arrayOfCoordinations[0], arrayOfCoordinations[1]);
  nameOfCurrCanvas.lineTo(arrayOfCoordinations[2], arrayOfCoordinations[3]);
  // console.log('***: ', flag);
  if (flag === 'red') {
    nameOfCurrCanvas.font = '30px sans-serif';
    nameOfCurrCanvas.strokeStyle = 'red';
    nameOfCurrCanvas.fillStyle = 'red';
    nameOfCurrCanvas.fillText(nameOfSwitch, arrayOfCoordinationsForOnOff[0], arrayOfCoordinationsForOnOff[1]);
    nameOfCurrCanvas.fillText('выкл.', arrayOfCoordinationsForOnOff[2], arrayOfCoordinationsForOnOff[3]);
  }
  if (flag === 'green') {
    nameOfCurrCanvas.font = '30px sans-serif';
    nameOfCurrCanvas.strokeStyle = 'green';
    nameOfCurrCanvas.lineTo(arrayOfCoordinations[4], arrayOfCoordinations[5]);
    nameOfCurrCanvas.fillStyle = 'green';
    nameOfCurrCanvas.fillText(nameOfSwitch, arrayOfCoordinationsForOnOff[0], arrayOfCoordinationsForOnOff[1]);
    nameOfCurrCanvas.fillText('вкл.', arrayOfCoordinationsForOnOff[2], arrayOfCoordinationsForOnOff[3]);
  }
  nameOfCurrCanvas.stroke();
  nameOfCurrCanvas.closePath();
};

export const drawLine = (nameOfCurrCanvas, arrayOfCoordinations, flag) => {
  nameOfCurrCanvas.beginPath();
  nameOfCurrCanvas.lineWidth = 3;
  nameOfCurrCanvas.setLineDash([]);
  nameOfCurrCanvas.moveTo(arrayOfCoordinations[0], arrayOfCoordinations[1]);
  nameOfCurrCanvas.lineTo(arrayOfCoordinations[2], arrayOfCoordinations[3]);
  nameOfCurrCanvas.lineTo(arrayOfCoordinations[4], arrayOfCoordinations[5]);
  nameOfCurrCanvas.strokeStyle = 'green';
  if (flag === 'red') {
    nameOfCurrCanvas.strokeStyle = 'red';
  }
  nameOfCurrCanvas.stroke();
  nameOfCurrCanvas.closePath();
};

export const drawSmallRectangle = (nameOfCurrCanvas, arrayOfCoordinations) => {
  nameOfCurrCanvas.beginPath();
  nameOfCurrCanvas.lineWidth = 3;
  nameOfCurrCanvas.setLineDash([]);
  nameOfCurrCanvas.strokeStyle = 'white';
  nameOfCurrCanvas.rect(
    arrayOfCoordinations[0],
    arrayOfCoordinations[1],
    arrayOfCoordinations[2],
    arrayOfCoordinations[3]
  );
  nameOfCurrCanvas.font = '22px sans-serif';
  nameOfCurrCanvas.fillStyle = 'white';
  nameOfCurrCanvas.fillText('М2М', arrayOfCoordinations[4], arrayOfCoordinations[5]);
  nameOfCurrCanvas.stroke();
  nameOfCurrCanvas.closePath();
};

export const drawDataBox = (nameOfCurrCanvas, arrayOfCoordinations) => {
  nameOfCurrCanvas.beginPath();
  nameOfCurrCanvas.lineWidth = 1;
  nameOfCurrCanvas.setLineDash([5, 5]);
  nameOfCurrCanvas.rect(arrayOfCoordinations[0], arrayOfCoordinations[1], 340, 280);
  nameOfCurrCanvas.strokeStyle = 'white';
  nameOfCurrCanvas.globalAlpha = 0.5;
  nameOfCurrCanvas.stroke();
  nameOfCurrCanvas.closePath();
};

export const dataForUIPF = (nameOfCurrCanvas, letter, arrayOfCoordinations) => {
  nameOfCurrCanvas.beginPath();
  nameOfCurrCanvas.fillStyle = 'white';
  nameOfCurrCanvas.globalAlpha = 0.5;
  nameOfCurrCanvas.setLineDash([]);
  nameOfCurrCanvas.font = '21px sans-serif';
  nameOfCurrCanvas.fillText(letter, arrayOfCoordinations[0], arrayOfCoordinations[1]);
  nameOfCurrCanvas.stroke();
  nameOfCurrCanvas.closePath();
};


export const dataForABMWh = (nameOfCurrCanvas, letter, arrayOfCoordinations) => {
  nameOfCurrCanvas.beginPath();
  nameOfCurrCanvas.font = "21px sans-serif";
  nameOfCurrCanvas.globalAlpha = 1;
  nameOfCurrCanvas.setLineDash([]);
  if (arrayOfCoordinations[0][1]) {
    nameOfCurrCanvas.fillStyle = 'red';
  } else {
    nameOfCurrCanvas.fillStyle = 'white';
  }
  if (letter === 'Volt') {
    nameOfCurrCanvas.fillText(`${arrayOfCoordinations[0][0]} Volt`, arrayOfCoordinations[1], arrayOfCoordinations[2]);
  } else if (letter === 'mA') {
    nameOfCurrCanvas.fillText(`${arrayOfCoordinations[0][0]} mA`, arrayOfCoordinations[1], arrayOfCoordinations[2]);
  } else {
    nameOfCurrCanvas.fillText(`${arrayOfCoordinations[0][0]} VA`, arrayOfCoordinations[1], arrayOfCoordinations[2]);
  }
  nameOfCurrCanvas.stroke();
  nameOfCurrCanvas.closePath();
};

export const dataForCosineHz = (nameOfCurrCanvas, letter, arrayOfCoordinations) => {
  nameOfCurrCanvas.beginPath();
  nameOfCurrCanvas.lineWidth = 3;
  nameOfCurrCanvas.globalAlpha = 1;
  nameOfCurrCanvas.setLineDash([]);
  nameOfCurrCanvas.font = 'italic 24px sans-serif';
  // nameOfCurrCanvas.font = 'italic 24px Regular';
  nameOfCurrCanvas.fillStyle = 'white';
  if (letter === 'f') {
    nameOfCurrCanvas.fillText(
      `f= ${arrayOfCoordinations[0]} Гц`,
      arrayOfCoordinations[1],
      arrayOfCoordinations[2]
    );
  } else {
    nameOfCurrCanvas.fillText(`cos ф= ${arrayOfCoordinations[0]}`, arrayOfCoordinations[1], arrayOfCoordinations[2]);
  }
  nameOfCurrCanvas.stroke();
  nameOfCurrCanvas.closePath();
};


