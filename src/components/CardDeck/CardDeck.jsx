import React, { useEffect } from 'react';
import {Button} from 'react-bootstrap'
import DeckImage from '../../assets/war-games-card-deck.png'
// import '../../App.css'

function CardDeck(props) {

    useEffect(()=>{
        if(props.userDeck){ 
       let deck = document.getElementsByClassName('deck')[0]
       deck.classList.add("user-deck")
         }
    }, [])



    return (
        <div className = "deck" >
            {props.userDeck ? 
            <Button variant="primary" className = "deal-deck-button" onClick = {props.dealCard}>Deal Card </Button>
            :
            null
        }
        </div>
    );
}

export default CardDeck;