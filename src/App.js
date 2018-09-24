import React, { Component } from 'react';
import './App.css';

let canvas = '';
let video = '';

class App extends Component {
  state = {
    stopVid: false,
    step: 1,
  };

  componentDidMount() {
    this.launchProgram();
  };

  launchProgram = () => {
    canvas = document.getElementById('myCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    this.makeVideo();
  };

  makeVideo = () => {
    video = document.getElementById('video');
    video.width = window.innerWidth/2;
    video.height = window.innerHeight/2;

    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.src = window.URL.createObjectURL(stream);
        // video.play();
        const canvasVid = canvas.getContext('2d');
        this.draw(video, canvasVid, canvas.width, canvas.height);
      });
    }else{
      console.log('something is wrong.');
    };
  };

  takeScreenshot = () => {
    this.setState({
      stopVid: true,
      step: 2,
    });
  };

  saveScreenshot = () => {
    const dataURL = canvas.toDataURL();
    console.log(dataURL);
    window.open(dataURL);
  };

  addText = (text) => {
    const myText = canvas.getContext('2d');
    myText.fillStyle = 'blue';
    myText.font = '40pt Calibri';
    myText.fillText('testing text', ((window.innerWidth/2) - 100), window.innerHeight/2);
  };

  clearCanvas = () => {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.makeVideo();
  };

  draw = (v,c,w,h) => {
    if (this.state.stopVid) return false;
    c.drawImage(v, 0, 0, w, h);
    setTimeout(this.draw, 20, v, c, w, h);
  };

  step1 = () => {
    return (
      <div id='holder'>
        <div id='shutter' onClick={this.takeScreenshot}></div>
      </div>
    );
  };

  step2 = () => {
    return (
      <div id='holder'>
        <div className='button' onClick={this.addText}>make text</div>  &nbsp;&nbsp;&nbsp;&nbsp;
        <div className='button' onClick={this.clearCanvas}>reset</div> &nbsp;&nbsp;&nbsp;&nbsp;
        <div className='button' onClick={this.saveScreenshot}>save</div>
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.state.step === 1 ? this.step1() : this.step2() }
        <video id='video' width='640' height='480' autoPlay></video>
        <canvas id='myCanvas' width='500' height='500'></canvas>
      </React.Fragment>
    );
  }
}

export default App;
