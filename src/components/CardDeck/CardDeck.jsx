import React from 'react';
import {Image, Button} from 'react-bootstrap'
import DeckImage from '../../assets/war-games-card-deck.png'
// import '../../App.css'

function CardDeck(props) {
    return (
        <div >
            <Image src = {DeckImage} className = "deck">
            </Image>
        </div>
    );
}

export default CardDeck;