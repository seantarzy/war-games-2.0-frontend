import React from 'react';
import CardDeck from '../CardDeck/CardDeck';
import PlayerCard from '../PlayerCard/PlayerCard'
function OpponentArea(props) {
    return (
        <div>
            <CardDeck/>
             {props.battleInSession ? 
            <PlayerCard className = "computer-player-card" player = {props.opponentPlayer} compPlayer = {true} flip = {props.flip}/>
            :
            null}
        </div>
    );
}

export default OpponentArea;