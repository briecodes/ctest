import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

let angleText = '';

class Home extends Component {

  state = {
    angle: 0,
  };

  componentDidMount() {
    console.log('Home page loaded.');
    angleText = document.getElementById('angle');

    if (window.DeviceMotionEvent) {
      window.addEventListener('deviceorientation', e => this.deviceMotionHandler(e));
    };
  };

  deviceMotionHandler = (evt) => {
    const num = Math.floor(evt.gamma)
    angleText.innerHTML = num;

    if (num >= -4 && num <= 4 ) {
      this.setState({ angle: 0 });
    } else if (num < 4 && num >= -8 ) {
      this.setState({ angle: -1 });
    } else if (num < -8 && num >= -16 ) {
      this.setState({ angle: -2 });
    } else if (num < -16 && num >= -20 ) {
      this.setState({ angle: -3 });
    } else if (num < -20 || num > 20 ) {
      this.setState({ angle: -4 });
    } else if (num > 4 && num <= 8 ) {
      this.setState({ angle: 1 });
    } else if (num > 8 && num <= 16 ) {
      this.setState({ angle: 2 });
    } else if (num > 16 && num <= 20 ) {
      this.setState({ angle: 3 });
    }
  };

  start = () => {
    window.history.pushState({}, "new state", 'booth');
  };

  render() {
    return (
      <center>
        <img src='./assets/pcf.png' alt='pcf' width='30%' />
        <p id='intro'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus ante, maximus vel nibh in, varius sollicitudin sem.
        </p>
        <NavLink to="/booth" exact className='button'>
          Start >
        </NavLink>
        <div id='pic'>
          {this.state.angle === 0 ? <img src='./assets/0.jpg' alt='pic' height='100' width='auto' /> : null }
          {this.state.angle === -1 ? <img src='./assets/b1.jpg' alt='pic' height='100' width='auto' /> : null }
          {this.state.angle === -2 ? <img src='./assets/b2.jpg' alt='pic' height='100' width='auto' /> : null }
          {this.state.angle === -3 ? <img src='./assets/b-3.jpg' alt='pic' height='100' width='auto' /> : null }
          {this.state.angle === -4 ? <img src='./assets/ab.jpg' alt='pic' height='100' width='auto' /> : null }
          {this.state.angle === 1 ? <img src='./assets/a-1.jpg' alt='pic' height='100' width='auto' /> : null }
          {this.state.angle === 2 ? <img src='./assets/a-2.jpg' alt='pic' height='100' width='auto' /> : null }
          {this.state.angle === 3 ? <img src='./assets/a-3.jpg' alt='pic' height='100' width='auto' /> : null }
        </div>
        <div id='angle'></div>
      </center>
    );
  };
};

export default Home;