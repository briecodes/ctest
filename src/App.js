import React, { Component } from 'react';
import './App.css';

let canvas = '';
let video = '';

class App extends Component {

  componentDidMount() {
    this.launchProgram();
  };

  launchProgram = () => {
    canvas = document.getElementById('myCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // CAMERA ACCESS
    video = document.getElementById('video');
    video.width = window.innerWidth;
    video.height = window.innerHeight;
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

  makeVideo = () => {
    // const vid = canvas.getContext('2d');
    
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
  };

  addText = (text) => {
    const myText = canvas.getContext('2d');
    myText.fillStyle = 'blue';
    myText.font = '40pt Calibri';
    myText.fillText('testing text', ((window.innerWidth/2) - 100), window.innerHeight/2);
  };

  render() {
    return (
      <React.Fragment>
        <div id='holder'>
          <div className='button' onClick={() => this.makeLine(0, 0, window.innerWidth/2, window.innerHeight/2)}>make line</div>
          <div id='shutter' onClick={this.takeScreenshot}></div>
          <div className='button' onClick={this.addText}>make text</div>
        </div>
        <video id='video' width='640' height='480' autoPlay></video>
        <canvas id='myCanvas' width='500' height='500'></canvas>
      </React.Fragment>
    );
  }
}

export default App;
