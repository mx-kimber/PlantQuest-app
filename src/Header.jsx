import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";

export function Header() {
  return (
    <header>
      <nav>
      <Link to="/about">About</Link>
      <a href="/plants">Home</a>
      <a href="/login">Login</a>
      <a href="/Signup">Signup</a>
      <LogoutLink />
      <Link to="schedules">Schedules</Link>
      <Link to="collected_plants">Collected Plants</Link>
      </nav>
    </header>
  )
}