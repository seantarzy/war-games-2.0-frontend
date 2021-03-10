import React, { useEffect } from 'react';
import CardDeck from '../CardDeck/CardDeck';
import PlayerCard from '../PlayerCard/PlayerCard'
import {Button, ButtonToolbar} from 'react-bootstrap'

function UserArea(props) {

    useEffect(()=>{
        console.log("user area")
    },[])
    return (
        <section className = "user-area">
            {props.cardsRevealed || !props.gameStart? 
            <div>
             <h3 className = "whose-turn">{props.myTurn ? "Your Turn to Deal": "Opponent's Turn to Deal"}</h3>
               <ButtonToolbar className ="deal-card-wrapper">
                <Button className = "deal-card-button" color="primary" variant = "primary" onClick = {props.dealCard} disabled = {!props.myTurn}> 
                    <h2>
                    Deal {props.score > 0 ? "Next" : null} Card
                    </h2> 
                    </Button>
            </ButtonToolbar>
            </div>
            
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