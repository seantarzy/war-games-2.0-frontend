import logo from './logo.svg';
import './App.css';
import {getPlayers} from './services/utils'
import React from 'react'
import MainMenu from './components/MainMenu/MainMenu';
import { WarGamesProvider } from "./Context/context";

class App extends React.Component{

    state = {
      players: [],
      isMoble: false,
      isDesktop: false
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
      <MainMenu/>
    </WarGamesProvider>
  )
  }
}

export default App;
