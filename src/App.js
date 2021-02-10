import logo from './logo.svg';
import './App.css';
import {getPlayers} from './services/utils'
import React from 'react'
class App extends React.Component{


    state = {
      players: [],
      isMoble: false,
      IsDesktop: false
    }


  componentDidMount = ()=>{
    getPlayers()
    .then((players)=>{
        this.setState({players});
      // console.log(players)
    })
        if (window.innerWidth > 769) {
          this.setState({isMoble: true});
        } else {
            this.setState({IsDesktop: true});
        }

  }

  render(){


    
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
  }
}

export default App;
