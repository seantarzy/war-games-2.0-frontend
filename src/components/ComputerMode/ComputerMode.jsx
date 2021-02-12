import React, {useContext, useEffect, useState} from 'react';
import WarGamesContext from '../../Context/context';
import BattleField from '../BattleField/BattleField';
import OpponentArea from '../OpponentArea/OpponentArea';
import PlayerCard from '../PlayerCard/PlayerCard';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import UserArea from '../UserArea/UserArea';
import Swal from 'sweetalert2'

function ComputerMode(props) {
const {players} = useContext(WarGamesContext)

// const [computerDeck, setComputerDeck] = useState([])
// const[playerDeck, setPlayerDeck]= useState([])

const [userScore, setuserScore] = useState(0)
const [opponentScore, setopponentScore] = useState(0)
const [userPlayer, setUserPlayer] = useState({})
const [compPlayer, setCompPlayer] = useState({})
const [battleInSession, setBattleInSession] = useState(false)
const [flip, setFlip] = useState(false)

    useEffect(()=>{

    }, [])

    const dealCard = ()=>{
        let randomPlayer1 = getRandomPlayer()
        let randomPlayer2 = getRandomPlayer()

        // debugger
        // setCompPlayer(getRandomPlayer());
        setUserPlayer(randomPlayer1);
        setCompPlayer(randomPlayer2);
        // displayPlayingCards(userPlayer, compPlayer)
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

    const handleBattle = (userPlayerWar, compPlayerWar)=>{
        console.log("handling battle: ", userPlayerWar, compPlayerWar)
        setBattleInSession(true)
        setTimeout(() => {
           
            setBattleInSession(false)
            setFlip(false)
        },
        3000)
        

        setTimeout(() => {
            console.log("setting score...", userPlayerWar, compPlayerWar)
            if(userPlayerWar > compPlayerWar){
                console.log("hit")
               setuserScore(userScore+1)
           }   
           else if(userPlayerWar < compPlayerWar){
                console.log("hit")
               setopponentScore(opponentScore+1)
           }
        },
        3100)

        setTimeout(()=>{
            setFlip(true)
        }, 2000)

    }
   const getRandomPlayer = ()=>{

       let randomPlayer = players[Math.floor(Math.random() * players.length)]
        return randomPlayer
   }
    return (
        <div>
            {userScore ==10 ?
            Swal.fire({
  title: 'You Won!',
  text: 'Play again?',
  icon: 'success',
  confirmButtonText: 'Ok'
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
refreshPage()
  }
})
            :
            opponentScore == 10 ? 
     Swal.fire({
  title: 'You Lost!',
  text: 'Play again?',
  icon: 'error',
  confirmButtonText: 'Ok'
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
refreshPage()
  }
})
        :
        null
        }
            <ScoreBoard userScore = {userScore} opponentScore={opponentScore}/>
            <OpponentArea compPlayer = {compPlayer} battleInSession = {battleInSession} flip = {flip}/>
            <BattleField className = "battle-field"  userPlayer= {userPlayer} compPlayer = {compPlayer} battleInSession = {battleInSession}/>
            <UserArea dealCard = {dealCard} userPlayer= {userPlayer} battleInSession = {battleInSession} flip = {flip}/>
        </div>
    );
}

export default ComputerMode;