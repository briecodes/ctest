import React, { Component } from 'react';
import './App.css';

let canvas = '';

class App extends Component {

  componentDidMount() {
    this.launchProgram();
  };

  launchProgram = () => {
    document.addEventListener('click', this.takeScreenshot );
    canvas = document.getElementById('myCanvas');
    // const text = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    this.makeLine(0, 0, window.innerWidth/2, window.innerHeight/2);

    // text.fillStyle = 'blue';
    // text.font = '40pt Calibri';
    // text.fillText('Hello World!', ((window.innerWidth/2) - 100), window.innerHeight/2);

    // CAMERA ACCESS
    let video = document.getElementById('video');
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        console.log('working on it...');
          video.src = window.URL.createObjectURL(stream);
          video.play();
      });
    }else{
      console.log('something is wrong.');
    }
  };

  takeScreenshot = () => {
    const dataURL = canvas.toDataURL();
    console.log(dataURL);
    window.open(dataURL);
  };

  makeLine = (a1, a2, b1, b2) => {
    const line = canvas.getContext('2d');
    line.beginPath();
    line.moveTo(a1, a2);
    line.lineTo(b1, b2);
    line.stroke();
  }

  render() {
    return (
      <React.Fragment>
        <video id="video" width="640" height="480" autoPlay></video>
        <canvas id='myCanvas' width='500' height='500'></canvas>
      </React.Fragment>
    );
  }
}

export default App;
