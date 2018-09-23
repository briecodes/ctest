import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.launchProgram();
  };

  launchProgram = () => {
    let canvas = document.getElementById('myCanvas');
    let context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.fillStyle = 'blue';
    context.font = '40pt Calibri';
    context.fillText('Hello World!', 150, 100);
  };

  render() {
    return (
      <canvas id='myCanvas' width='500' height='500'></canvas>
    );
  }
}

export default App;
