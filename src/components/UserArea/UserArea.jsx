import React from 'react';
import CardDeck from '../CardDeck/CardDeck';
import PlayerCard from '../PlayerCard/PlayerCard'

function UserArea(props) {
    return (
        <section className = "user-area">
             {props.battleInSession ?
            <PlayerCard className = "user-player-card" player = {props.userPlayer} userPlayer = {true} flip = {props.flip}/>
            :
            null}
            <CardDeck userDeck = {true} dealCard = {props.dealCard} className = "user-deck"/>

        </section>
    );
}

export default UserArea;