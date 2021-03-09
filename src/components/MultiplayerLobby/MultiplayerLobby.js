import React, {useContext, useEffect, useState} from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import WarGamesContext from "../../Context/context";
import Fade from "react-reveal/Fade";
import Title from "../../Title/Title";
import shortid from "shortid";
import Swal from "sweetalert2";
import { usePubNub } from "pubnub-react";

function MultiplayerLobby(props) {
        const { isDesktop, isMobile } = useContext(WarGamesContext);
        const pubnub = usePubNub();
        const [roomId, setRoomId] = useState("test-room")
        const joinRoom=(value)=>{
            setRoomId(value)
              pubnub
                .hereNow({
                  channels: [`wargames${value}`],
                })
                .then((response) => {
                  if (response.totalOccupancy < 2) {
                    pubnub.subscribe({
                      channels: [`wargames${roomId}`],
                      withPresence: true,
                    });
                    pubnub.publish({
                      message: {
                        notRoomCreator: true,
                      },
                      channel: `wargames${roomId}`,
                    });
                  }
                })
                .then(()=>{
                    
                })
                .catch((error) => {
                  console.log(error);
                });
        }
     const handleJoinRoom = (e) => {
          Swal.fire({
            position: "top",
            input: "text",
            allowOutsideClick: false,
            inputPlaceholder: "Enter the room id",
            showCancelButton: true,
            confirmButtonColor: "rgb(208,33,41)",
            confirmButtonText: "OK",
            width: 275,
            padding: "0.7em",
            customClass: {
              heightAuto: false,
              popup: "popup-class",
              confirmButton: "join-button-class",
              cancelButton: "join-button-class",
            },
          })
            .then((result) => {
              if (result.value) {
                joinRoom(result.value);
              }
            })
            .then(pubnub.addListener({ message: handleMessage}));
        };

        const createRoomAndSubscribe = ()=>{
            let newRoomId = shortid.generate().substring(0, 5);
           setRoomId(newRoomId);
            console.log("room id: ",roomId)
            pubnub.subscribe({
              channels: [`wargames${newRoomId}`],
              withPresence: true,
            })
        }

    const handleCreateRoom = ()=>{
        if(!roomId){
                createRoomAndSubscribe()
        }
                if(roomId){
            Swal.fire({
            position: "middle",
            allowOutsideClick: false,
            title: "Share this room ID with your friend",
            text: roomId,
            width: 275,
            padding: "0.7em",
            customClass: {
                heightAuto: false,
                title: "title-class",
                popup: "popup-class",
                confirmButton: "button-class",
            },
            }
            )
            .then(()=>  
            pubnub.addListener({ message: handleMessage})
            )
        }
   
    }

    const publishMessage = ()=>{
        pubnub.publish({
          message: "yo from pubnub",
          channel: `yo`,
        });
    }

    const handleMessage = (event) => {
            console.log("received", event);
           };
    useEffect(()=>{
        pubnub.subscribe({channels: ["yo"]})
        pubnub.addListener({message: handleMessage})
        createRoomAndSubscribe()
    },[])


    return (
      <div>
        <section>
          <Container className="main-menu-wrapper">
            <div className="col-xs-3">
              <Title title="LOBBY" className="main-menu-title" />
              <Row>
                <Col lg={4} sm={12}>
                  <Fade
                    left={isMobile}
                    bottom={isDesktop}
                    duration={1000}
                    delay={500}
                    distance="30px"
                  >
                    <div className="computer-option">
                      <Button
                        variant="primary"
                        size="lg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="menu-button"
                        onClick={handleJoinRoom}
                      >
                        <h3 className="computer-option-button-text">
                          Join Room
                        </h3>
                        <div></div>
                      </Button>
                    </div>
                  </Fade>
                </Col>
                <br></br>
                <br></br>
                <Col lg={8} sm={12}>
                  <Fade
                    right={isMobile}
                    bottom={isDesktop}
                    duration={1000}
                    delay={1000}
                    distance="30px"
                  >
                    <div className="multiplayer-option">
                      <Button
                        target="_blank"
                        aria-label="Project Link"
                        rel="noopener noreferrer"
                        className="menu-button"
                        onClick={handleCreateRoom}
                      >
                        <h3 className="omputer-option-button-text">
                          Create Room
                        </h3>
                      </Button>
                      <Button onClick = {publishMessage}>
                          Test pubnub
                      </Button>
                    </div>
                  </Fade>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </div>
    );
}

export default MultiplayerLobby;