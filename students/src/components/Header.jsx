import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>Student Management</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
