import React, { Component } from 'react';
import './App.css';

let canvas = '';
let video = '';

class App extends Component {
  state = {
    stopVid: false,
    step: 1,
    frame: 1,
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
    setTimeout(function(){
      window.scrollTo(0, 0);
    }, 0);

    video = document.getElementById('video');
    video.width = window.innerWidth/2;
    video.height = window.innerHeight/2;

    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.src = window.URL.createObjectURL(stream);
        video.play();
        const canvasVid = canvas.getContext('2d');
        this.draw(video, canvasVid, canvas.width, canvas.height);
      });
    }else{
      console.log('something is wrong.');
    };
  };

  stopVideo = () => {
    video.pause();
    video.src = "";
    // this.resetCanvas();
  }

  takeScreenshot = () => {
    document.getElementById('frame').classList.add('hide');

    if (this.state.frame === 1){
      const frameImg = document.getElementById('hiddenImage1');
      const frame = canvas.getContext('2d');
      const ratio = frameImg.width / frameImg.height;
      frame.drawImage(frameImg, (canvas.width/2) - (canvas.height * ratio)/2, 0, canvas.height * ratio, canvas.height);
    }else {
      const frameImg = document.getElementById('hiddenImage2');
      const frame = canvas.getContext('2d');
      const ratio = frameImg.width / frameImg.height;
      frame.drawImage(frameImg, (canvas.width/2) - (canvas.height * ratio)/2, 0, canvas.height * ratio, canvas.height);
    };

    this.setState({
      stopVid: true,
      step: 2,
    });
  };

  saveScreenshot = () => {
    const dataURL = canvas.toDataURL('image/png');
    const image = new Image();
    const w = window.open('');

    image.src = dataURL;
    w.document.write(image.outerHTML);
  };

  addText = (text) => {
    const myText = canvas.getContext('2d');
    myText.fillStyle = 'blue';
    myText.font = '40pt Calibri';
    myText.fillText('testing text', ((window.innerWidth/2) - 100), window.innerHeight/2);
  };

  resetCanvas = () => {
    this.setState({step: 1, stopVid: false});
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    const canvasVid = canvas.getContext('2d');
    this.draw(video, canvasVid, canvas.width, canvas.height);
  };

  draw = (v,c,w,h) => {
    if (this.state.stopVid) return false;
    c.drawImage(v, 0, 0, w, h);
    setTimeout(this.draw, 20, v, c, w, h);
  };

  step1 = () => {
    return (
      <div id='holder'>
        <div className='button' onClick={this.prevNext}>&nbsp; &lt; &nbsp;&nbsp;</div>
        <div id='shutter' onClick={this.takeScreenshot}></div>
        <div className='button' onClick={this.prevNext}>&nbsp;&nbsp; &gt; &nbsp;</div>
      </div>
    );
  };

  step2 = () => {
    return (
      <div id='holder'>
        <div className='button' onClick={this.addText}>make text</div>  &nbsp;&nbsp;&nbsp;&nbsp;
        <div className='button' onClick={this.resetCanvas}>reset</div> &nbsp;&nbsp;&nbsp;&nbsp;
        <div className='button' onClick={this.saveScreenshot}>save</div>
      </div>
    );
  };

  prevNext = () => {
    console.log('click');
    if (this.state.frame === 1){
      this.setState({
        frame: 2
      });
    }else {
      this.setState({
        frame: 1
      });
    };
  };

  render() {
    return (
      <React.Fragment>
        {this.state.step === 1 ? this.step1() : this.step2() }
        {this.state.frame === 1 ? <div className="frame1" id='frame'></div> : <div className="frame2" id='frame'></div> }
        <video id='video' width='640' height='480' autoPlay></video>
        <canvas id='myCanvas' width='500' height='500'></canvas>
        <div className='hide'>
          <img id='hiddenImage1' src='./assets/frame1.png' alt='hidden' />
          <img id='hiddenImage2' src='./assets/frame2.png' alt='hidden dos' />
        </div>
      </React.Fragment>
    );
  };
};

export default App;
