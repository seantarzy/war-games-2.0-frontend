import React from 'react';
import PlayerCard from '../PlayerCard/PlayerCard';

function BattleField(props) {

    return (
        <div className = "battle-field">
            {/* {props.battleInSession ?
            <div >
            <PlayerCard className = "computer-player-card" player = {props.compPlayer} compPlayer = {true}/>
            <PlayerCard className = "user-player-card" player = {props.userPlayer} userPlayer = {true}/>
            </div>
        : */}
        {/* null} */}


            {/* <text>battle field</text> */}
        </div>
    );
}

export default BattleField;