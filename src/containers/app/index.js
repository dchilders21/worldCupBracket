import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import Confirmation from '../confirmation'
import ScoreBoard from '../scoreBoard'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">World Cup Bracket</h1>
        </header>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/confirmation" component={Confirmation} />
          <Route exact path="/scoreboard" component={ScoreBoard} />
        </main>
      </div>
    );
  }
}

export default App;
