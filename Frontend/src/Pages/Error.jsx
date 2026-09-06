import { NavLink } from "react-router-dom";
import "../index.css";

const Error = () => {
  return (
    <section className="error-page">
      <div className="error-content">
        <h1>404</h1>
        <h2>Sorry, Page Not Found</h2>

        <p>
          The page you are looking for doesn't exist or may have been moved.
        </p>

        <div className="error-buttons">
          <NavLink to="/" className="error-btn">
            Return Home
          </NavLink>

          <NavLink to="/contact" className="error-btn">
            Report Problem
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Error;
