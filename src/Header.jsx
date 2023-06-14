import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";
import Nav from "react-bootstrap/Nav";


export function Header() {
  let authenticationLinks;
  if (localStorage.jwt === undefined) {
    authenticationLinks = (
      <>
        <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
      </>
    );
  } else {
    authenticationLinks = <LogoutLink style={{ marginTop: "10px" }} />;
  }
 
  return (
    <header>
      <Nav variant="pills" defaultActiveKey="/plant_quest">
        <Nav.Item>
          <img src="https://media.istockphoto.com/id/1045368942/vector/abstract-green-leaf-logo-icon-vector-design-ecology-icon-set-eco-icon.jpg?s=612x612&w=0&k=20&c=XIfHMI8r1G73blCpCBFmLIxCtOLx8qX0O3mZC9csRLs=" alt="Brand Photo" className="brand-photo" />
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/plants" eventKey="/plants">All Plants</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/schedules" eventKey="/schedules">Schedules</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/collected_plants" eventKey="/collected_plants">myPlants</Nav.Link>
        </Nav.Item>
        {authenticationLinks}
      </Nav>
    </header>
  );
}  

