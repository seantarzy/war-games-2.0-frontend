import React from 'react';
import BattleField from '../BattleField/BattleField';
import OpponentArea from '../OpponentArea/OpponentArea';
import UserArea from '../UserArea/UserArea';

function ComputerMode(props) {
    return (
        <div>
            <OpponentArea/>
            <BattleField/>
            <UserArea/>
            <text>computer</text>
        </div>
    );
}

export default ComputerMode;