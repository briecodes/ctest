import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const ipadRatio = 0.75;
const vidRatio = 1.3;

let canvas = '';
let video = '';
let canvasVid = '';

class Booth extends Component {
  state = {
    stopVid: false,
    step: 1,
    frame: 1,
  };

  componentDidMount() {
    this.createCanvas();
    this.createVideo();
  };

  componentWillUnmount() {
    this.stopVideo();
  };

  canvasInfo = () => {
    console.log('-------canvas info--------');
    console.log('canvas width, height:', canvas.width + ' ' + canvas.height);
    console.log('window width, height:', window.innerWidth + ' ' + window.innerHeight);
    console.log('------- / canvas info--------');
  };

  createCanvas = () => {
    canvas = document.getElementById('myCanvas');
    canvas.width = window.innerHeight * ipadRatio;
    canvas.height = window.innerHeight;
  };

  createVideo = () => {
    video = document.getElementById('video');

    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        canvasVid = canvas.getContext('2d');

        video.src = window.URL.createObjectURL(stream);
        video.play();
        this.drawVideo(video, canvasVid, (canvas.height * vidRatio), canvas.height);
      });
    }else{
      console.log('something is wrong.');
    };
  };

  stopVideo = () => {
    video.pause();
    video.src = "";
    this.setState({
      stopVid: true,
    });
  };

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
    myText.fillText('testing text', ((canvas.width/2) - 100), canvas.height/2);
  };

  resetCanvas = () => {
    document.getElementById('frame').classList.remove('hide');

    this.setState({
      step: 1,
      stopVid: false,
    });

    this.createVideo();
  };

  drawVideo = (v,c,w,h) => {
    if (this.state.stopVid) return false;
    c.drawImage(v, -Math.abs((canvas.height * ipadRatio)/2.75), 0, w, h);
    setTimeout(this.drawVideo, 20, v, c, w, h);
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
        <NavLink to="/" exact className='button' id='home'>Home</NavLink>

        {this.state.step === 1 ? this.step1() : this.step2() }
        {this.state.frame === 1 ? <div className="frame1" id='frame'></div> : <div className="frame2" id='frame'></div> }
        
        <video id='video' className='hide' width='640' height='480' autoPlay></video>
        <canvas id='myCanvas' width='500' height='500' onClick={this.canvasInfo}></canvas>

        <div className='hide'>
          <img id='hiddenImage1' src='./assets/frame1.png' alt='hidden' />
          <img id='hiddenImage2' src='./assets/frame2.png' alt='hidden dos' />
        </div>
      </React.Fragment>
    );
  };
};

export default Booth;