import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function CardDeck(props) {

    return (
        <div className = {props.userDeck ? "user-deck" : "opponent-deck"} >
           
        </div>
    );
}

export default CardDeck;