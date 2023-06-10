import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";

export function Header() {
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
      <nav>
        <Link to="/plant_quest">PlantQuest</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/schedules">Schedules</Link>
        <Link to="/collected_plants">myPlants</Link>
        {authenticationLinks}
      </nav>
    </header>
  );
}
