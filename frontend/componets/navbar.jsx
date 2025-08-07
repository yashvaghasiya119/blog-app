import { Link } from "react-router-dom";
import "../pages/style/navbar.css";

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MyBlog</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blog/add">Add Blog</Link></li>
        {/* <li><Link to="/categories">Categories</Link></li> */}
        <li><Link to="/about">About</Link></li>
        {/* <li><Link to="/contact">Contact</Link></li> */}
        <li><Link to="/auth/login">Login</Link></li>
      </ul>
    </nav>
  );
}
