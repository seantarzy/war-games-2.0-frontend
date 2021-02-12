import React from 'react';

function ScoreBoard(props) {

    console.log("score: ", props.userScore, props.opponentScore)
    return (
        <div className = "scoreboard">
            <h2 className = "user-score">
            Home: {props.userScore}
            </h2>
            <h2 className = "opponent-score">
            Away: {props.opponentScore}
            </h2>
        </div>
    );
}

export default ScoreBoard;