import React, { Component } from 'react';
import People from './People';
import Companies from './Companies';

class Home extends Component {
  render() {
    return (
      <div id="home">
        <People />
        <Companies />
      </div>
    );
  }
}

export default Home;
