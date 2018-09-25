import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Home';
import Booth from './Booth';

class App extends Component {

  home = () => {
    return <Home />;
  };

  booth = () => {
    return <Booth />;
  };

  render() {
    return (
      <Router>
        <div id='container'>
          <Route exact path='/' render={this.home} />
          <Route exact path='/booth' render={this.booth} />
        </div>
      </Router>
    );
  };
};

export default App;
