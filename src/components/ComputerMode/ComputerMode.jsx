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
        console.log("dealing card")
         setUserPlayer(getRandomCard());
         setCompPlayer(getRandomCard());
        // displayPlayingCards(userPlayer, compPlayer)
        let userPlayerWar = parseInt(userPlayer['war'])
        let compPlayerWar = parseInt(compPlayer['war'])
        handleBattle(userPlayerWar, compPlayerWar)

    }


      function refreshPage() {
    window.location.reload(false);
  }
    // const displayPlayingCards = (userPlayer, compPlayer)=>{


    //     let userPlayerCard = <PlayerCard player = {userPlayer}/>
    //     let compPlayerCard = <PlayerCard player = {compPlayer}/>
    //     // document.getElementsByClassName('battle-field')[0].append(userPlayerCard)
    //     // document.getElementsByClassName('battle-field')[0].append(compPlayerCard)
    //     console.log(userPlayerCard, compPlayerCard)
    // }

    const handleBattle = (userPlayerWar, compPlayerWar)=>{
        setBattleInSession(true)
        setTimeout(() => {
           
            setBattleInSession(false)
            setFlip(false)
        //  console.log('Hello, World!')
        },
        3000)
        

        setTimeout(() => {
            if(userPlayerWar > compPlayerWar){
                console.log("user wins this point")
               setuserScore(userScore+1)
           }   
           else if(userPlayerWar < compPlayerWar){
                console.log("opponent this point")
               setopponentScore(opponentScore+1)
           }   
      
        },
        3100)

        setTimeout(()=>{
            setFlip(true)
        }, 2000)

    }
   const getRandomCard = ()=>{
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
            <OpponentArea getRandomCard = {getRandomCard} compPlayer = {compPlayer} battleInSession = {battleInSession} flip = {flip}/>
            <BattleField className = "battle-field"  userPlayer= {userPlayer} compPlayer = {compPlayer} battleInSession = {battleInSession}/>
            <UserArea getRandomCard = {getRandomCard} dealCard = {dealCard} userPlayer= {userPlayer} battleInSession = {battleInSession} flip = {flip}/>
        </div>
    );
}

export default ComputerMode;