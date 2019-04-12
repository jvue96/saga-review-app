import React, { Component } from 'react';
import './App.css';

// have to import connect to talk to redux 
import { connect } from 'react-redux'; 



class App extends Component {

  componentDidMount () {
    this.props.dispatch( {type: 'SET_CHARACTERS', payload: [`hello, testing`] })
  }

  render() {
    return (
      <div className="App">
        <header>
         <h1> Atbash Favorite Star Wars Characters </h1>
        </header>
      </div>
    );
  }
}

export default connect()(App);
