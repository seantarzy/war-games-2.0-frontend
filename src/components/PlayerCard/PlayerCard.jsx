import React, { useEffect } from 'react';
import {Card} from 'react-bootstrap'
function PlayerCard(props) {


    useEffect(()=>{
        console.log("player card props",props)
    },[])
    
    return (
    <Card className = "player-card">
        <Card.Img variant="top" src={props.img}/>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
        </Card>
    );
}

export default PlayerCard;