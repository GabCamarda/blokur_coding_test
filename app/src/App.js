import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Song from './song/Song';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Song />
      </div>
    );
  }
}


export default App;
