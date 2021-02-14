import React, { useEffect } from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap'
import DeckImage from '../../assets/war-games-card-deck.png'
// import "bootstrap/dist/css/bootstrap.min.css";

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
            <ButtonToolbar>
                <Button color="primary" variant = "primary" onClick = {props.dealCard}>Deal Card </Button>
            </ButtonToolbar>
            :
            null
        }
        </div>
    );
}

export default CardDeck;