import React, { useContext } from 'react';
import Fade from "react-reveal/Fade"
import { Container, Row, Col, Button } from "react-bootstrap";
import WarGamesContext from '../../Context/context'
import Title from '../../Title/Title';
import {Link} from 'react-router-dom'
import '../../App.css'
function MainMenu(props) {

    const {isDesktop, isMobile} = useContext(WarGamesContext)
            return (
    <section>
            <Container className = "main-menu-wrapper">
                <div className='col-xs-3'>
          <Title title="Main Menu"  className = "main-menu-title"/>
              <Row >
                <Col lg={4} sm={12}>
                <Link to="/computer-game">
                  <Fade
                    left={isMobile}
                    bottom={isDesktop}
                    duration={1000}
                    delay={500}
                    distance="30px"
                  >
                    <div className="computer-option">
                            <Button
                            variant = "primary"
                            size="lg"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="menu-button"
                            >
                      <h3 className="computer-option-button-text">Play Vs. Computer</h3>
                      <div>
                      </div>
                      </Button>
                    </div>
                  </Fade>
                  </Link>
                </Col>
                <br>
                </br>
                <br>
                </br>
                <Col lg={8} sm={12}>
                  <Link to="/multiplayer-game">
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
                        >
                        <h3 className="omputer-option-button-text">Play Multiplayer</h3>

                      </Button>
                    </div>
                  </Fade>
                        </Link>
                </Col>
              </Row>
        </div>
            </Container>
        </section>
    );
}

export default MainMenu;