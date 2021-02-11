import React from 'react';
import CardDeck from '../CardDeck/CardDeck';

function UserArea(props) {
    return (
        <section className = "user-area">
            <text>user side</text>
            <CardDeck userDeck = {true} dealCard = {props.dealCard} className = "user-deck"/>
        </section>
    );
}

export default UserArea;