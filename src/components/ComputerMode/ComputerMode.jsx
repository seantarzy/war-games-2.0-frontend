import React, {useContext, useEffect, useState} from 'react';
import WarGamesContext from '../../Context/context';
import BattleField from '../BattleField/BattleField';
import OpponentArea from '../OpponentArea/OpponentArea';
import PlayerCard from '../PlayerCard/PlayerCard';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import FeedbackText from '../FeedbackText/FeedbackText.jsx'
import UserArea from '../UserArea/UserArea'
import Swal from 'sweetalert2'

function ComputerMode(props) {
const {players} = useContext(WarGamesContext)

const [feedbackText, setfeedbackText] = useState(false)
const [userScore, setuserScore] = useState(0)
const [opponentScore, setopponentScore] = useState(0)
const [userPlayer, setUserPlayer] = useState({})
const [compPlayer, setCompPlayer] = useState({})
const [battleInSession, setBattleInSession] = useState(false)
const [flip, setFlip] = useState(false)
const [userWinsBattle, setUserWinsBattle] = useState(false)
    const dealCard = ()=>{
        let randomPlayer1 = getRandomPlayer()
        let randomPlayer2 = getRandomPlayer()
        setUserPlayer(randomPlayer1);
        setCompPlayer(randomPlayer2);
        let userPlayerWar = randomPlayer1['war']
        let compPlayerWar = randomPlayer2['war']
           let userPlayerWarFloat = parseFloat(userPlayerWar)
           let compPlayerWarFloat = parseFloat(compPlayerWar)
            
        console.log("wars: ", userPlayerWar, compPlayerWar)
        handleBattle(userPlayerWarFloat, compPlayerWarFloat)
    }

      function refreshPage() {
    window.location.reload(false);
  }


    const handleWinner = (winner)=>{
        if(winner){
            Swal.fire({
            title: winner=="user" ? 'You Won!' : 'You Lost',
            text: 'Play again?',
            icon: winner=="user" ? 'success' : 'error',
            confirmButtonText: 'Ok'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        refreshPage()
                        }
                    })
            }

    }

    const handleBattle = (userPlayerWar, compPlayerWar)=>{
        setBattleInSession(true)
        setTimeout(() => {
           
            setBattleInSession(false)
            setFlip(false)
        },
        4000)
        

setTimeout(() => {
    setfeedbackText(false)
    if(userPlayerWar > compPlayerWar){
        setUserWinsBattle(true)
        setuserScore(userScore+1)
        if(userScore===2){
            handleWinner("user")   
        }
    }
    else if(userPlayerWar < compPlayerWar){
        setopponentScore(opponentScore+1)
        if(opponentScore === 1){
            handleWinner("opponent") 
        }
        return <FeedbackText userPoint = {false}/>
    }
},
        4100)

    setTimeout(()=>{
        if(userPlayerWar > compPlayerWar){
        setUserWinsBattle(true)
        }
          else if(userPlayerWar < compPlayerWar){
              setUserWinsBattle(false)
          }
        setfeedbackText(true)

        setFlip(true)
        }, 2000)
    setTimeout(()=>{
    }, 3150)    
    }
    
   const getRandomPlayer = ()=>{

       let randomPlayer = players[Math.floor(Math.random() * players.length)]
        return randomPlayer
   }
    return (
        <div>
            <ScoreBoard userScore = {userScore} opponentScore={opponentScore}/>
            {feedbackText ?<FeedbackText userWinsBattle = {userWinsBattle}/> : null}
            <OpponentArea compPlayer = {compPlayer} battleInSession = {battleInSession} flip = {flip}/>
            <BattleField className = "battle-field"  userPlayer= {userPlayer} compPlayer = {compPlayer} battleInSession = {battleInSession}/>
            <UserArea dealCard = {dealCard} userPlayer= {userPlayer} battleInSession = {battleInSession} flip = {flip}/>
        </div>
    );
}

export default ComputerMode;