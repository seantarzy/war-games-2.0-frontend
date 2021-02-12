import React, { useEffect } from 'react';
import {Card, Image} from 'react-bootstrap'
import baseballCardBack from '../../assets/war-games-baseball-card-back.png'
function PlayerCard(props) {


    useEffect(()=>{
        console.log("player card props",props.player.name)
    },[])
    return (
    <div className = { props.userPlayer ?  "user-player-card" : "computer-player-card"} style={{ width: '10rem', height: '15rem'}}>
      {props.flip ?
      <Card className = "baseball-card-front">
    <Card.Header className = "card-Header">{props.player.name}</Card.Header>
  <Card.Body>
    <Image classname = "card-image" src = {props.player.image}/>
  </Card.Body>
  <Card.Footer>
    War: {props.player.war}
  </Card.Footer>
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