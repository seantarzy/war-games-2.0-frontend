import React, { useContext, useEffect } from 'react';
import WarGamesContext from '../../Context/context'
import {Card, Image} from 'react-bootstrap'
import baseballCardBack from '../../assets/war-games-baseball-card-back.png'
function PlayerCard(props) {

    useEffect(()=>{
      // console.log("context yo: ",WarGamesContext)
    },[])

    const {isMobile} = useContext(WarGamesContext);
    console.log("mobile: ",isMobile)
    if(isMobile){
      console.log("mobile")
    }
    return (
    <div className = { props.userPlayer ?  "user-player-card" : "computer-player-card"} style={ isMobile ? {  width: '8rem', height: '6rem'} : {  width: '10rem', height: '11rem'}}>
      {props.flip ?
      <Card className = "baseball-card-front">
    <Card.Header className = "card-Header">{props.player.name}</Card.Header>
  <Card.Body>
    <Image className = "card-image" src = {props.player.image}/>
  </Card.Body>
  <Card.Footer>
    War: {props.player.war}
  </Card.Footer>
      </Card>
    :
    <Card className = "baseball-card-back" style={{ width: '9rem', height: '14rem'}} >
<Image className = "card-image" src={baseballCardBack} />
    </Card>
}
      </div>
    );
}

export default PlayerCard;