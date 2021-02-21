import React, { useContext, useEffect, useState } from 'react';
import WarGamesContext from '../../Context/context'
import {Card, Image} from 'react-bootstrap'
import baseballCardBack from '../../assets/war-games-baseball-card-back.png'
function PlayerCard(props) {

    const {isMobile} = useContext(WarGamesContext);

    const [viewStats, setViewStats] = useState(false)

 
    const flipToStats = ()=>{
      
      console.log("flippin", viewStats, props)
      setViewStats(true)
    }
    const flipBackToFront = ()=>{
      setViewStats(false)
    }

    useEffect(()=>{
    setViewStats(false)
      },[])


    return (
    <div className = { props.userPlayer ?  "user-player-card" : "computer-player-card"} style={ isMobile ? {  width: '8rem', height: '6rem'} : {  width: '10rem', height: '11rem'}} 
    >
      {props.flip && !viewStats ?
      <Card className = "baseball-card-front"  onClick = {flipToStats}>
        <div className = "text-flip">
    <Card.Header className = "card-Header">{props.player.name}</Card.Header>
        </div>
  <Card.Body>
    <Image className = "card-image" src = {props.player.image}/>
  </Card.Body>
  <div className = "text-flip">
  <Card.Footer>
    War: {props.player.war}
  </Card.Footer>
  </div>
      </Card>
       : props.flip && viewStats ? 
    <Card className="baseball-card-full-stats" onClick = {flipBackToFront}>

        <Card.Header className = "card-Header" >{props.player.name}</Card.Header>
        <Card.Subtitle>Career Stats</Card.Subtitle>
        {props.player.role === "hitter" ? 
        <Card.Body>
          <Card.Text>AB: {props.player.at_bats}</Card.Text>
          <Card.Text>Runs: {props.player.runs}</Card.Text>
          <Card.Text>Hits: {props.player.hits}</Card.Text>
          <Card.Text>Hrs: {props.player.hr}</Card.Text>
          <Card.Text>RBI: {props.player.rbi}</Card.Text>
          <Card.Text>Avg: {props.player.avg}</Card.Text>
          <Card.Text>SB: {props.player.stolen_bases}</Card.Text>
        </Card.Body>
      :
         <Card.Body>
          <Card.Text>W: {props.player.wins}</Card.Text>
          <Card.Text>L: {props.player.losses}</Card.Text>
          <Card.Text>ERA: {props.player.era}</Card.Text>
          <Card.Text>SO: {props.player.strikeouts}</Card.Text>
          <Card.Text>Sv: {props.player.saves}</Card.Text>
          <Card.Text>IP: {props.player.ip}</Card.Text>
        </Card.Body>
      }

      </Card>
    :
    !props.flip ?
    <Card className = "baseball-card-back" style={{ width: '9rem', height: '14rem'}} >
<Image className = "card-image" src={baseballCardBack} />
    </Card>
    :
    null
}
      </div>
    );
}

export default PlayerCard;