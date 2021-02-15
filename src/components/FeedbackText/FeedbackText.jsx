import React, { useEffect } from 'react';
function FeedbackText(props) {


    useEffect(()=>{
        console.log("feedback text")
    },[])
    return (
        <div>
            {props.userWinsBattle? 
            <h1>Nice!</h1>
            :
            <h1>Ouch!</h1>
            }
        </div>
    );
}

export default FeedbackText;