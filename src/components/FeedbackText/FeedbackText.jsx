import React, { useEffect } from 'react';
import '../../App.css'
function FeedbackText(props) {

    return (
        <div >
            {props.userWinsBattle? 
            <h1 className = "feedback-text-win">Nice!</h1>
            :
            <h1 className = "feedback-text-loss">Ouch!</h1>
            }
        </div>
    );
}

export default FeedbackText;