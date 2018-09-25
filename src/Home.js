import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Home extends Component {

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
      </center>
    );
  };
};

export default Home;