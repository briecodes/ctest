import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Home extends Component {

  state = {
    angle: 0,
    images: ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'],
  };

  componentDidMount() {
    console.log('Home page loaded.');

    if (window.DeviceMotionEvent) {
      window.addEventListener('deviceorientation', e => this.deviceMotionHandler(e));
    };
  };

  images = (w,h) => {
    return this.state.images.map(img => {
      return <img src={`./assets/${img}`} alt='img' width={`${w}`} height={`${h}`} className='hide-img' key={img} id={img} />;
    });
  };

  getSectionWidth = () => {
    const angleNum = 90;
    const sections = angleNum/(((this.getImgCount()-2)/2)+2);

    return sections;
  };

  getImgCount = () => {
    return this.state.images.length;
  };

  classHandler = (sign, id) => {
    if (sign === '-'){
      document.getElementById(id).classList.remove('hide-img');
    } else {
      document.getElementById(id).classList.add('hide-img');
    };
  };

  cycleImages = (id) => {
    for (const image of this.state.images) {
      if ( image === id ) {
        this.classHandler('-', image);
      } else {
        this.classHandler('+', image);
      };
    };
  };

  display = (id, content) => {
    document.getElementById(id).innerHTML = content;
  };

  deviceMotionHandler = (evt) => {
    const num = evt.gamma;
    // this.display('angle', `Angle: ${Math.floor(num)}. Sections: ${this.getSectionWidth()}`);

    this.rotateImages(num, this.getSectionWidth(), this.state.images, this.cycleImages);
  };

  rotateImages = (currentAngle, sectionWidth, imgArr, func) => {
    let i = 0;
    const sideNum = ((imgArr.length-2)/2)+2;

    for (const n of imgArr) {
      if ( currentAngle > i * sectionWidth && currentAngle < (i + 1) * sectionWidth) {
        func( n );
        return;
      } else if ( currentAngle < i * sectionWidth && currentAngle > -(i + 1) * sectionWidth) {
        if (i < sideNum - 2) {
          func( imgArr[sideNum + i] );
        } else {
          func( imgArr[sideNum - 1] );
        }
        return;
      } else {
        i++
      };
    };
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
          {this.images('auto', '150px')}
        </div>
        <div id='angle'></div>
        <div id='notes'></div>
        <div id='addnote'></div>
        <NavLink to="/" exact className='button'>
          Back
        </NavLink>
      </center>
    );
  };
};

export default Home;