import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function CardDeck(props) {

    useEffect(()=>{
        if(props.userDeck){ 
       let deck = document.getElementsByClassName('deck')[0]
       deck.classList.add("user-deck")
         }
    })

    return (
        <div className = "deck" >
            {props.userDeck ? 

            <p>My deck</p>
         
            :
            null
        }
        </div>
    );
}

export default CardDeck;