import React, {useContext, useState} from 'react';
import PubNub from "pubnub";
import {PubNubProvider} from 'pubnub-react'
import UserArea from '../UserArea/UserArea'
import WarGamesContext from '../../Context/context';
import MultiplayerLobby from '../MultiplayerLobby/MultiplayerLobby';


function MultiplayerMode(props) {
const {players} = useContext(WarGamesContext)
const [subscribed,setsubscribed] = useState(false)
const [gameStart, setGameStart] = useState(false)

    const pubnub = new PubNub({
        publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
        subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY
    })
    return (
        <PubNubProvider client = {pubnub}>
            {gameStart ?
            <UserArea/>
            :
            <MultiplayerLobby setGameStart = {setGameStart}/>}
        </PubNubProvider>
    );
}

export default MultiplayerMode;