import React, {useContext, useEffect, useState} from 'react';
import WarGamesContext from '../../Context/context';
import BattleField from '../BattleField/BattleField';
import OpponentArea from '../OpponentArea/OpponentArea';
import PlayerCard from '../PlayerCard/PlayerCard';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import UserArea from '../UserArea/UserArea';

function ComputerMode(props) {
const {players} = useContext(WarGamesContext)

// const [computerDeck, setComputerDeck] = useState([])
// const[playerDeck, setPlayerDeck]= useState([])

const [userScore, setuserScore] = useState(0)
const [opponentScore, setopponentScore] = useState(0)

    useEffect(()=>{


    }, [])

    const dealCard = ()=>{
        console.log("dealing card")
        let userPlayer = getRandomCard()
        let compPlayer = getRandomCard()
        displayPlayingCards(userPlayer, compPlayer)
        let userPlayerWar = parseInt(userPlayer['war'])
        let compPlayerWar = parseInt(compPlayer['war'])
        handleBattle(userPlayerWar, compPlayerWar)
    }

    const displayPlayingCards = (userPlayer, compPlayer)=>{
        let userPlayerCard = <PlayerCard player = {userPlayer}/>
        let compPlayerCard = <PlayerCard player = {compPlayer}/>
        // document.getElementsByClassName('battle-field')[0].append(userPlayerCard)
        // document.getElementsByClassName('battle-field')[0].append(compPlayerCard)
        console.log(userPlayerCard, compPlayerCard)
    }

    const handleBattle = (userPlayerWar, compPlayerWar)=>{
            if(userPlayerWar > compPlayerWar){
                setuserScore(userScore+1)
            }   
            if(userPlayerWar < compPlayerWar){
                setopponentScore(opponentScore+1)
            }   

    }
   const getRandomCard = ()=>{
       let randomPlayer = players[Math.floor(Math.random() * players.length)]
        return randomPlayer
   }
    return (
        <div>
            <ScoreBoard userScore = {userScore} opponentScore={opponentScore}/>
            <OpponentArea getRandomCard = {getRandomCard}/>
            <BattleField className = "battle-field" />
            <UserArea getRandomCard = {getRandomCard} dealCard = {dealCard}/>
            <text>computer</text>
        </div>
    );
}

export default ComputerMode;