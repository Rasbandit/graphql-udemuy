import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import Person from './Components/Person';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/people/:id" component={Person} />
        </Switch>
      </div>
    );
  }
}

export default App;
