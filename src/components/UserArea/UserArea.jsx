import React from 'react';
import CardDeck from '../CardDeck/CardDeck';
import PlayerCard from '../PlayerCard/PlayerCard'
import {Button, ButtonToolbar} from 'react-bootstrap'

function UserArea(props) {
    return (
        <section className = "user-area">
            {props.cardsRevealed || !props.gameStart? 
               <ButtonToolbar className ="deal-card-wrapper">
                <Button className = "deal-card-button" color="primary" variant = "primary" onClick = {props.dealCard}>   
                    <h2>
                    Deal {props.score > 0 ? "Next" : null} Card
                    </h2> 
                    </Button>
            </ButtonToolbar>
            : 
            null}
             {props.battleInSession ?
            <PlayerCard className = "user-player-card" player = {props.userPlayer} userPlayer = {true} flip = {props.flip}/>
            :
            null}
            <CardDeck userDeck = {true} dealCard = {props.dealCard} />
        </section>
    );
}

export default UserArea;