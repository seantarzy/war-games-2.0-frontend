import React, { useEffect } from 'react';
import {Card, Image} from 'react-bootstrap'
import baseballCardBack from '../../assets/war-games-baseball-card-back.png'
function PlayerCard(props) {


    useEffect(()=>{
        console.log("player card props",props.player.war)
    },[])
    return (
    <div className = { props.userPlayer ?  "user-player-card" : "computer-player-card"} style={{ width: '10rem', height: '15rem'}}>

      {props.flip ?
      <Card className = "baseball-card-front">
  <Card.Body>
    <Card.Title>{props.player.name}</Card.Title>
    <Image classname = "card-image" src = {props.player.image}/>
  <Card.Footer>
    {props.player.war}
  </Card.Footer>
  </Card.Body>
      </Card>
    :
    <Card className = "baseball-card-back">
  <Card.Body >
<Image className = "card-image" src={baseballCardBack} />
  </Card.Body>
    </Card>
}
      </div>
    );
}

export default PlayerCard;