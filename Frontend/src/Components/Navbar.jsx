import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./Navbar.css";

const Navbar = () => {
  const { token, user } = useAuth();

  const isLoggedIn = !!token;
  const isAdmin = user?.isAdmin === true;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/">Gagan Khandelwal</NavLink>
      </div>

      <ul className="navbar-links">

        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/about">
            About
          </NavLink>
        </li>

        <li>
          <NavLink to="/contact">
            Contact
          </NavLink>
        </li>

        <li>
          <NavLink to="/service">
            Service
          </NavLink>
        </li>

        {/* Admin Panel - Only Admin */}
        {isLoggedIn && isAdmin && (
          <li>
            <NavLink to="/admin/users">
              Admin Panel
            </NavLink>
          </li>
        )}

        {isLoggedIn ? (
          <li>
            <NavLink to="/logout">
              Logout
            </NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/register">
                Register
              </NavLink>
            </li>

            <li>
              <NavLink to="/login">
                Login
              </NavLink>
            </li>
          </>
        )}

      </ul>
    </nav>
  );
};

export default Navbar;