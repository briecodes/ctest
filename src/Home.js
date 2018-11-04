import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// let angleText = '';

class Home extends Component {

  state = {
    angle: 0,
    images: ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'],
  };

  componentDidMount() {
    console.log('Home page loaded.');
    // angleText = document.getElementById('angle');

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
    const sections = angleNum/this.getImgCount();

    return sections;
  };

  getImgCount = () => {
    return this.state.images.length;
  };

  classHandler = (s, e) => {
    if (s === '-'){
      document.getElementById(e).classList.remove('hide-img');
    } else {
      document.getElementById(e).classList.add('hide-img');
    };
  };

  cycleImages = (n) => {
    for (const i of this.state.images) {
      let index = this.state.images.indexOf(i);
      if ( index === n ) {
        this.classHandler('-', this.state.images[n]);
        this.display('notes', `Image: ${this.state.images[n]}`);
      } else {
        this.classHandler('+', this.state.images[index]);
        this.display('notes', `Image: ${this.state.images[index]}`);
      };
    };
  };

  display = (e, c) => {
    document.getElementById(e).innerHTML = c;
  };

  deviceMotionHandler = (evt) => {
    // const num = Math.floor(evt.gamma);
    const num = evt.gamma;
    this.display('angle', `Angle: ${num}. Sections: ${this.getSectionWidth()}`);

    this.circleDivider(num, this.getSectionWidth(), this.state.images, this.cycleImages)

    // if (num >= -4 && num <= 4 ) {
    //   // this.setState({ angle: 0 });
    //   this.cycleImages(0);
    // } else if (num < 4 && num >= -8 ) {
    //   // this.setState({ angle: -1 });
    //   this.cycleImages(5);
    // } else if (num < -8 && num >= -16 ) {
    //   // this.setState({ angle: -2 });
    //   this.cycleImages(6);
    // } else if (num < -16 && num >= -20 ) {
    //   // this.setState({ angle: -3 });
    //   this.cycleImages(7);
    // } else if (num < -20 || num > 20 ) {
    //   // this.setState({ angle: -4 });
    //   this.cycleImages(4);
    // } else if (num > 4 && num <= 8 ) {
    //   // this.setState({ angle: 1 });
    //   this.cycleImages(1);
    // } else if (num > 8 && num <= 16 ) {
    //   // this.setState({ angle: 2 });
    //   this.cycleImages(2);
    // } else if (num > 16 && num <= 20 ) {
    //   // this.setState({ angle: 3 });
    //   this.cycleImages(3);
    // }
  };

  circleDivider = (currentAngle, sectionWidth, imgArr, func) => {
    this.display('addnotes', `inside circleDivider`);
    let i = 0;
    for (const n of imgArr) {
      let index = imgArr.indexOf(n) + 1;

      if ( currentAngle > i * index && currentAngle < index * sectionWidth) {
        // this.display('addnotes', `circleDivider. i: ${i}. index of i: ${this.state.images.indexOf(n)}. sectionWidth: ${sectionWidth}`);
        func( this.state.images.indexOf(n) );
        return;
      } else if ( currentAngle < -1 *(i * index) && currentAngle > -1 * (index * sectionWidth)) {
        this.display('addnotes', `circleDivider. i: ${i}. index of i: ${this.state.images.indexOf(n)}. first: ${-1 *(i * index)}. second: ${-1 * (index * sectionWidth)}`);
        func( this.state.images.indexOf(n) );
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
          {/* {this.state.angle === 0 ? <img src='./assets/0.jpg' alt='pic' height='100' width='auto' /> : null }
          {this.state.angle === -1 ? <img src='./assets/b1.jpg' alt='pic' height='100' width='auto' /> : null }
          {this.state.angle === -2 ? <img src='./assets/b2.jpg' alt='pic' height='100' width='auto' /> : null }
          {this.state.angle === -3 ? <img src='./assets/b-3.jpg' alt='pic' height='100' width='auto' /> : null }
          {this.state.angle === -4 ? <img src='./assets/ab.jpg' alt='pic' height='100' width='auto' /> : null }
          {this.state.angle === 1 ? <img src='./assets/a-1.jpg' alt='pic' height='100' width='auto' /> : null }
          {this.state.angle === 2 ? <img src='./assets/a-2.jpg' alt='pic' height='100' width='auto' /> : null }
          {this.state.angle === 3 ? <img src='./assets/a-3.jpg' alt='pic' height='100' width='auto' /> : null } */}
        </div>
        <div id='angle'></div>
        <div id='notes'></div>
        <div id='addnotes'></div>
      </center>
    );
  };
};

export default Home;