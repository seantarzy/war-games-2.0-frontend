import React, {useContext, useEffect, useState} from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import WarGamesContext from "../../Context/context";
import Fade from "react-reveal/Fade";
import Title from "../../Title/Title";
import shortid from "shortid";
import Swal from "sweetalert2";

class MultiplayerLobby extends React.Component {

    state = {
        isDesktop: true,
        isMobile: false,
        roomId: "test-room",
        lobbyChannel: null,
        gameChannel: null
    }
        joinRoom=()=>{
            this.props.setMyTurn(false);
              this.props.pubnub
                .hereNow({
                  channels: [this.state.lobbyChannel],
                })
                .then((response) => {
                  if (response.totalOccupancy < 2) {
                    this.props.pubnub.subscribe({
                      channels: [this.state.lobbyChannel],
                      withPresence: true,
                    });
                    this.props.pubnub.addListener({
                        message: this.handleMessage,
                    });

                    this.props.pubnub.publish({
                      message: {
                        notRoomCreator: true,
                      },
                      channel: this.state.lobbyChannel,
                    });
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
        }
      handleJoinRoom = (e) => {
          Swal.fire({
            position: "middle",
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
                this.setState({
                  roomId: result.value,
                  lobbyChannel: `lobby-channel-${result.value}`,
                });
                this.joinRoom();
              }
            })
            .then(()=>{
                console.log("adding listener")
            
            })
            .then(()=>{
                  this.props.pubnub
                    .hereNow({
                      channels: [this.state.lobbyChannel],
                    })
                    .then((response) => {
                      console.log(response.totalOccupancy);
                    });
                })
                    
        };

        createRoomAndSubscribe = ()=>{
        this.props.pubnub.addListener({
                          message: this.handleMessage,
                        });
            console.log("subscribing")
            let newRoomId = shortid.generate().substring(0, 5);
           this.setState({roomId: newRoomId, lobbyChannel: `lobby-channel-${newRoomId}`});
            this.props.pubnub.subscribe({
              channels: [`lobby-channel-${newRoomId}`],
              withPresence: true,
            });
        }

     handleCreateRoom = ()=>{
        this.createRoomAndSubscribe()
        setTimeout(()=>{
            Swal.fire({
            position: "middle",
            allowOutsideClick: false,
            title: "Share this room ID with your friend",
            text: this.state.roomId,
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
        },500)
    }

     publishMessage = (newMessage)=>{
        this.props.pubnub.publish({
          message: newMessage,
          channel: this.state.lobbyChannel,
        });
    }

     handleMessage = (event) => {
            console.log("received", event)
            if(event.message.notRoomCreator){
                console.log("game start yo")
                this.props.startGameAndSubscribe(this.state.roomId)
            }
           };
    componentDidMount = ()=>{
        // this.createRoomAndSubscribe()
    }

    componentDidUpdate = ()=>{
         if (this.state.lobbyChannel != null) {
             console.log("updating component", this.props.pubnub)
              this.props.pubnub
                .hereNow({
                  channels: [this.state.lobbyChannel],
                })
                .then((response) => {
                  console.log(response.totalOccupancy);
                });
         }
    }
render(){
    return (
      <div>
        <section>
          <Container className="main-menu-wrapper">
            <div className="col-xs-3">
              <Title title="LOBBY" className="main-menu-title" />
              <Row>
                <Col lg={4} sm={12}>
                  <Fade
                    left={this.state.isMobile}
                    bottom={this.state.isDesktop}
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
                        onClick={this.handleJoinRoom}
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
                    right={this.state.isMobile}
                    bottom={this.state.isDesktop}
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
                        onClick={this.handleCreateRoom}
                      >
                        <h3 className="omputer-option-button-text">
                          Create Room
                        </h3>
                      </Button>
                      <Button onClick = {()=>this.publishMessage("test")}>
                          Test this.props.pubnub
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
}

export default MultiplayerLobby;