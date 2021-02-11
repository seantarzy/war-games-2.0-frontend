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
            <Container>
                <div className="main-menu-wrapper">
          <Title title="Main Menu" />
              <Row >
                <Col lg={4} sm={12}>
                <Link to="/computer-game">
                  <Fade
                    left={isDesktop}
                    bottom={isMobile}
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
                <Col lg={8} sm={12}>
                  <Link to="/multiplayer-game">
                  <Fade
                    right={isDesktop}
                    bottom={isMobile}
                    duration={1000}
                    delay={1000}
                    distance="30px"
                  >
                    <div className="multiplayer-option">
                      <Button
                        // href={url || '#!'}
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