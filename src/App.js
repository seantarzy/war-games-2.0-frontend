import logo from './logo.svg';
import './App.css';
import {getPlayers} from './services/utils'
import React from 'react'
import MainMenu from './components/MainMenu/MainMenu';
import { WarGamesProvider } from "./Context/context";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ComputerMode from './components/ComputerMode/ComputerMode';
import MultiplayerMode from './components/MultiplayerMode/MultiplayerMode';
class App extends React.Component{

    state = {
      players: [],
      isMoble: false,
      isDesktop: false,
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
    <WarGamesProvider value = {{players: this.state.players, isMoble: this.state.isMoble, isDesktop: this.state.isDesktop}} >
      <Router>
    <Switch>
      <Route path = "/computer-game">
      <ComputerMode computerDeck = {this.state.computerDeck}/>
      </Route>
      <Route path = "/multiplayer-game">
        <MultiplayerMode/>
      </Route>
      <Route path = "/" >
      <MainMenu/>
      </Route>
    </Switch>
      </Router>
    </WarGamesProvider>
  )
  }
}

export default App;
