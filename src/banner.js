import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Banner extends Component {
  state = {
    angle: 0,
    images: ['pig1.png', 'pig2.png', 'pig3.png', 'pig4.png', 'pig5.png', 'pig6.png', 'pig7.png', 'pig8.png'],
    isMobile: false,
  };

  componentDidMount() {
    if ( window.DeviceMotionEvent ) {
      window.addEventListener('deviceorientation', e => this.deviceMotionHandler(e));
    };
  };

  images = (w,h) => {
    return this.state.images.map(img => {
      return <img src={`./assets/${img}`} alt='img' width={`${w}`} height={`${h}`} className='pig hide-img' key={img} id={img} />;
    });
  };

  getSectionWidth = () => {
    const angleNum = 30;
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

    this.rotateImages(num, this.getSectionWidth(), this.state.images, this.cycleImages);
  };

  rotateImages = (currentAngle, sectionWidth, imgArr, func) => {
    let i = 0;

    for (const n of imgArr) {
      if ( currentAngle > i * sectionWidth && currentAngle < (i + 1) * sectionWidth) {
        func( n );
        return;
      } else if ( currentAngle < i * sectionWidth && currentAngle > -(i + 1) * sectionWidth) {
        func( n );
        return;
      } else {
        i++
      };
    };
  };

  render() {
    return (
      <div id='mobile-page-example'>
        <div className='content-block-text'></div>
        <div className='content-block-text'></div>
        <div className='content-block-img'></div>

        <div id='banner-container'>
          <Link to='/demos/photoshare/home'>
            <div className='banner-content'>
              {this.images('173', '218')}
            </div>
          </Link>
        </div>

        <div className='content-block-text'></div>
        <div className='content-block-text'></div>
        <div className='content-block-img'></div>
        <div className='content-block-text'></div>
      </div>
    );
  };


};

export default Banner;