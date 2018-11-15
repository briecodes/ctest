import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Home extends Component {

  state = {
    angle: 0,
    images: ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'],
  };

  componentDidMount() {
    document.getElementsByTagName('html')[0].classList.add('homepage-bg');

    if (window.DeviceMotionEvent) {
      window.addEventListener('deviceorientation', e => this.deviceMotionHandler(e));
    };
  };

  componentWillUnmount() {
    document.getElementsByTagName('html')[0].classList.remove('homepage-bg');
  }

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
      <div id='intro-container'>
        <div id='intro'>
          <img src='/demos/photoshare/assets/gravityfalls-logo.png' alt='Gravity Falls Logo' width='30%' />
          <h1>Welcome to Gravity Falls!</h1>
          <p>
            Waddles has been awaiting your arrival. Take a picture with him to help fulfill his most wildest dream!
          </p>
          <NavLink to="/demos/photoshare/booth" exact className='home-button'>
            Start
          </NavLink>
        </div>
        
        {/* <div id='pic'>
          {this.images('auto', '150px')}
        </div> */}
      </div>
    );
  };
};

export default Home;