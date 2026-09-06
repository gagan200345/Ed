import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      {/* =========================
          FOOTER MAIN
      ========================== */}
      <div className="footer-main">

        {/* BRAND */}
        <div className="footer-brand">

          <NavLink
            to="/"
            end
            className="footer-logo"
          >
            Gagan<span>.</span>
          </NavLink>

          <p className="footer-tagline">
            Build skills. Build projects.
            <br />
            Build your future.
          </p>

          <div className="footer-socials">
            <a
              href="#"
              aria-label="GitHub"
              className="footer-social-link"
            >
              GH
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="footer-social-link"
            >
              in
            </a>

            <a
              href="#"
              aria-label="Twitter"
              className="footer-social-link"
            >
              X
            </a>
          </div>

        </div>

        {/* NAVIGATION */}
        <div className="footer-column">

          <h3>Navigation</h3>

          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/about">
            About
          </NavLink>

          <NavLink to="/service">
            Services
          </NavLink>

          <NavLink to="/contact">
            Contact
          </NavLink>

        </div>

        {/* ACCOUNT */}
        <div className="footer-column">

          <h3>Account</h3>

          <NavLink to="/login">
            Login
          </NavLink>

          <NavLink to="/register">
            Register
          </NavLink>

          <a href="#">
            Privacy
          </a>

          <a href="#">
            Terms
          </a>

        </div>

        {/* CONTACT */}
        <div className="footer-column footer-contact">

          <h3>Let's Connect</h3>

          <p>
            Have an idea or a project in mind?
          </p>

          <a
            href="mailto:hello@gagantechnical.com"
            className="footer-email"
          >
            hello@gagantechnical.com
          </a>

          <NavLink
            to="/contact"
            className="footer-contact-btn"
          >
            Start a conversation
            <span>↗</span>
          </NavLink>

        </div>

      </div>

      {/* =========================
          FOOTER BOTTOM
      ========================== */}
      <div className="footer-bottom">

        <p>
          © 2026 Gagan Technical. All rights reserved.
        </p>

        <div className="footer-status">

          <span className="footer-status-dot"></span>

          <span>
            All systems operational
          </span>

        </div>

      </div>

    </footer>
  );
};

export default Footer;