import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';


export function Header({ name, ...props }) {
  let authenticationLinks;
  if (localStorage.jwt === undefined) {
    authenticationLinks = (
      <>
        <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
      </>
    );
  } else {
    authenticationLinks = <LogoutLink />;
  }

 

    return (
      <header>
        <Container fluid>
          <Container>
            <Row>
              <Col xs={3} md={3}>
                <Nav variant="pills" defaultActiveKey="plants">
                  <Nav.Item>
                    <Nav.Link href="/plants">Browse All</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col xs={3} md={3}>
                <Nav variant="pills" defaultActiveKey="plants">
                  <Nav.Item>
                    <Nav.Link href="/collected_plants">MyPlants</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col xs={3} md={3}>
                <Nav variant="pills" defaultActiveKey="plants">
                  <Nav.Item>
                    <Nav.Link href="/schedules">Calendar</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col xs={3} md={3} className="d-flex align-items-left justify-content-end">
               
                <Image
                  src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Pic.png"
                  roundedCircle
                  className="small-image"
                  style={{ width: '70px', height: '70px' }}
                />
                
              </Col>
            </Row>
            </Container>
        </Container>
      </header>
    );
    }