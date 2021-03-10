import React, {useContext, useEffect, useState} from 'react';
import PubNub from "pubnub";
import {PubNubProvider} from 'pubnub-react'
import UserArea from '../UserArea/UserArea'
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import FeedbackText from '../FeedbackText/FeedbackText.jsx'
import WarGamesContext from '../../Context/context';
import MultiplayerLobby from '../MultiplayerLobby/MultiplayerLobby';
import Swal from 'sweetalert2'
import OpponentArea from '../OpponentArea/OpponentArea';


function MultiplayerMode (){
    const {players} = useContext(WarGamesContext)
    const [feedbackText, setfeedbackText] = useState(false)
    const [userScore, setuserScore] = useState(0)
    const [opponentScore, setopponentScore] = useState(0)
    const [userPlayer, setUserPlayer] = useState({})
    const [opponentPlayer, setOpponentPlayer] = useState({})
    const [battleInSession, setBattleInSession] = useState(false)
    const [flip, setFlip] = useState(false)
    const [userWinsBattle, setUserWinsBattle] = useState(false)
    const [cardsRevealed, setCardsRevealed] = useState(false)
    const [multiplayerReady,setMultiplayerReady] = useState(false)
    const [roomId, setRoomId] = useState(null)
    const [myTurn, setMyTurn] = useState(true)
    const [gameStart, setGameStart] = useState(false)
    

    const dealCard = ()=>{
        setGameStart(true)
        setCardsRevealed(false)
        setFlip(false)
        setBattleInSession(false)
        setUserPlayer({})
        setOpponentPlayer({})
        let randomPlayer1 = getRandomPlayer()
        let randomPlayer2 = getRandomPlayer()
            setUserPlayer(randomPlayer1);
            setOpponentPlayer(randomPlayer2);
            let userPlayerWar = randomPlayer1['war']
            let OpponentPlayerWar = randomPlayer2['war']
               let userPlayerWarFloat = parseFloat(userPlayerWar)
               let opponentPlayerWarFloat = parseFloat(OpponentPlayerWar)
               sendCardsToOpponent(randomPlayer1, randomPlayer2)
               setTimeout(()=>{
                   handleBattle(userPlayerWarFloat, opponentPlayerWarFloat)
               }, 100)
    }

    const sendCardsToOpponent=(player1,player2)=>{
        pubnub.publish({
            message: {player1: player1, player2: player2},
            channel: `wargames${roomId}`
        })
    }

    
   let pubnub = new PubNub({
        publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
        subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY
    })
    
   const startGameAndSubscribe = (newRoomId)=>{
       console.log("room id",newRoomId)
        setMultiplayerReady(true)
        setRoomId(newRoomId)
        this.pubnub.subscribe({
            channels: [`wargames${newRoomId}`],
            withPresence: true
        })
    }

    function refreshPage() {
    window.location.reload(false);
    }

    const handleWinner = (winner)=>{
        if(winner){
            Swal.fire({
            title: winner==="user" ? 'You Won!' : 'You Lost',
            text: 'Play again?',
            icon: winner==="user" ? 'success' : 'error',
            confirmButtonText: 'Ok',
            allowOutsideClick: ()=>refreshPage()
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        refreshPage()
                        }
                    })
            }
    }

        const handleBattlePoint = (userPlayerWar, opponentPlayerWar)=>{
        if(userPlayerWar > opponentPlayerWar){
            setUserWinsBattle(true)
            setuserScore(userScore+1)
                if(userScore===9){
                    handleWinner("user")   
                }
        }
        else if(userPlayerWar < opponentPlayerWar){
            setopponentScore(opponentScore+1)
                if(opponentScore === 9){
                    handleWinner("opponent") 
                }
        }
    }

    const handleBattle = (userPlayerWar, opponentPlayerWar)=>{
        setBattleInSession(true)
        setTimeout(()=>{
            if(userPlayerWar > opponentPlayerWar){
            setUserWinsBattle(true)
            }
              else if(userPlayerWar < opponentPlayerWar){
                  setUserWinsBattle(false)
              }
            setfeedbackText(true)
            setFlip(true)

            }, 2000)

        setTimeout(() => {
            setCardsRevealed(true)
        },
        3000)

        setTimeout(() => {
            handleBattlePoint(userPlayerWar,opponentPlayerWar)
            setfeedbackText(false)
            setMyTurn(!myTurn)
        },
        4100)
    }

    const handleMessage=(event)=>{
        if(!myTurn && multiplayerReady){
            console.log("not my turn")
        let currentUserPlayer = event.message.player2
        let currentOpponentPlayer = event.message.player1
            setUserPlayer(currentUserPlayer)
            setOpponentPlayer(currentOpponentPlayer)
            let userPlayerWar = currentUserPlayer['war']
            let opponentPlayerWar = currentOpponentPlayer['war']
               let userPlayerWarFloat = parseFloat(userPlayerWar)
               let opponentPlayerWarFloat = parseFloat(opponentPlayerWar)
               handleBattle(userPlayerWarFloat,opponentPlayerWarFloat)
        }

        console.log("message handler", event)
    }
       const getRandomPlayer = ()=>{
       let randomPlayer = players[Math.floor(Math.random() * players.length)]
        return randomPlayer
   }

    useEffect(() => {
    pubnub.addListener({ message: handleMessage });
    pubnub.subscribe({channels: [`wargames${roomId}`]} );
  }, [pubnub, multiplayerReady]);
    
    return (
        <PubNubProvider client = {pubnub} >
            {multiplayerReady ?
            <>
            <ScoreBoard userScore = {userScore} opponentScore={opponentScore}/>
            {feedbackText ?<FeedbackText userWinsBattle = {userWinsBattle}/> : null}
         <OpponentArea opponentPlayer = {opponentPlayer} battleInSession = {battleInSession} flip = {flip}/>
         <UserArea multiplayerMode = {true} dealCard = {dealCard} userDeck = {true} userPlayer= {userPlayer} battleInSession = {battleInSession} flip = {flip} score = {userScore + opponentScore} cardsRevealed= {cardsRevealed} multiplayerReady= {multiplayerReady} myTurn = {myTurn}/>
            </>
            :
            <MultiplayerLobby startGameAndSubscribe = {startGameAndSubscribe} pubnub = {pubnub} setMyTurn = {setMyTurn}/>}
        </PubNubProvider>
    );
}

export default MultiplayerMode;