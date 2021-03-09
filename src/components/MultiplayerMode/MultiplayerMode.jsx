import React, {useContext, useState} from 'react';
import PubNub from "pubnub";
import {PubNubProvider} from 'pubnub-react'
import UserArea from '../UserArea/UserArea'
import WarGamesContext from '../../Context/context';
import MultiplayerLobby from '../MultiplayerLobby/MultiplayerLobby';
import { render } from '@testing-library/react';


class MultiplayerMode extends React.Component{

    state = {
        gameStart: false,
        roomId: null,
    }

    pubnub = new PubNub({
        publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
        subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY
    })
    
    startGameAndSubscribe = (roomId)=>{
        this.setState({gameStart: true, roomId})
        this.pubnub.subscribe({
            channels: [`wargames${roomId}`],
            withPresence: true
        })
    }
    render(){
    return (
        <PubNubProvider client = {this.pubnub} >
            {this.state.gameStart ?
            <UserArea/>
            :
            <MultiplayerLobby startGameAndSubscribe = {this.startGameAndSubscribe} pubnub = {this.pubnub}/>}
        </PubNubProvider>
    );
            }
}

export default MultiplayerMode;