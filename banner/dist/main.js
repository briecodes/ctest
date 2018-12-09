document.addEventListener('DOMContentLoaded', () => {

  const state = {
    angle: 0,
    images: ['pig1.png', 'pig2.png', 'pig3.png', 'pig4.png', 'pig5.png', 'pig6.png', 'pig7.png', 'pig8.png'],
    isMobile: false,
  };

  // Detect if window supports Device Motion Events
  if ( window.DeviceMotionEvent ) {
    window.addEventListener('deviceorientation', deviceMotionHandler);
  };

  function deviceMotionHandler(evt) {
    const num = evt.gamma;
    rotateImages(num, getSectionWidth(), state.images, cycleImages);
  };

  function rotateImages(currentAngle, sectionWidth, imgArr, func) {
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

  function getSectionWidth() {
    const angleNum = 30;
    const sections = angleNum/(((getImgCount()-2)/2)+2);
    return sections;
  };

  function getImgCount() {
    return state.images.length;
  };

  function cycleImages(id) {
    for (const image of state.images) {
      if ( image === id ) {
        classHandler('-', image);
      } else {
        classHandler('+', image);
      };
    };
  };

  function classHandler(sign, id) {
    if (sign === '-'){
      document.getElementById(id).classList.remove('hide-img');
    } else {
      document.getElementById(id).classList.add('hide-img');
    };
  };

  function display(id, content) {
    document.getElementById(id).innerHTML = content;
  };

});