import React, {useContext, useEffect, useState} from 'react';
import WarGamesContext from '../../Context/context';
import OpponentArea from '../OpponentArea/OpponentArea';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import FeedbackText from '../FeedbackText/FeedbackText.jsx'
import UserArea from '../UserArea/UserArea'
import BattleField from '../BattleField/BattleField'
import Swal from 'sweetalert2'
import Loading1 from '../../assets/loading1.gif'

function ComputerMode() {
const {players} = useContext(WarGamesContext)

useEffect(()=>{
    console.log("players: ", players)
}, [])

const [feedbackText, setfeedbackText] = useState(false)
const [userScore, setuserScore] = useState(0)
const [opponentScore, setopponentScore] = useState(0)
const [userPlayer, setUserPlayer] = useState({})
const [compPlayer, setCompPlayer] = useState({})
const [battleInSession, setBattleInSession] = useState(false)
const [flip, setFlip] = useState(false)
const [userWinsBattle, setUserWinsBattle] = useState(false)


    const dealCard = ()=>{
        setFlip(false)
        setBattleInSession(false)
        setUserPlayer({})
        setCompPlayer({})
        let randomPlayer1 = getRandomPlayer()
        let randomPlayer2 = getRandomPlayer()
            setUserPlayer(randomPlayer1);
            setCompPlayer(randomPlayer2);
            let userPlayerWar = randomPlayer1['war']
            let compPlayerWar = randomPlayer2['war']
               let userPlayerWarFloat = parseFloat(userPlayerWar)
               let compPlayerWarFloat = parseFloat(compPlayerWar)
               setTimeout(()=>{
                   handleBattle(userPlayerWarFloat, compPlayerWarFloat)
               }, 100)
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

    const handleBattle = (userPlayerWar, compPlayerWar)=>{
        setBattleInSession(true)
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

        setTimeout(() => {
        },
        4000)

        setTimeout(() => {
            handleBattlePoint(userPlayerWar,compPlayerWar)
            setfeedbackText(false)
        },
        4100)
    }
    
   const getRandomPlayer = ()=>{
       let randomPlayer = players[Math.floor(Math.random() * players.length)]
        return randomPlayer
   }
    return (
        <div>

        {players.length > 0 ? 
        <>
            <ScoreBoard userScore = {userScore} opponentScore={opponentScore}/>
            {feedbackText ?<FeedbackText userWinsBattle = {userWinsBattle}/> : null}
            <OpponentArea compPlayer = {compPlayer} battleInSession = {battleInSession} flip = {flip}/>
            <BattleField className = "battle-field" />
            <UserArea dealCard = {dealCard} userPlayer= {userPlayer} battleInSession = {battleInSession} flip = {flip} score = {userScore + opponentScore} />
            </>
            :
            <div className = "loading">
            <h2>
                Getting Players...
                </h2> 
            <img src = {Loading1} className = "loading-gif"/>
                </div>}
            </div>
    );
}

export default ComputerMode;