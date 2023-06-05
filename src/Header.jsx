import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <nav>
      <Link to="/about">About</Link>
      <br />
      <a href="/">Home</a> | <a href="#">Link</a>
      </nav>
    </header>
  )
}