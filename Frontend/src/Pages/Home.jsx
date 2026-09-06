import { NavLink } from "react-router-dom";
import "../index.css"

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container grid-two">
          <div className="hero-content">
            <h1>Build Skills. Build Projects. Build Your Future.</h1>
            <p>
              We help you turn ideas into real, working products — from
              concept to launch, with clean code and thoughtful design at
              every step.
            </p>
            <div className="hero-buttons">
              <NavLink to="/contact" className="btn">
                Connect Now
              </NavLink>
              <NavLink to="/service" className="btn secondary-btn">
                Learn More
              </NavLink>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://m.media-amazon.com/images/I/81ZZUkunkkL._AC_UF894,1000_QL80_.jpg"
              alt="Hero visual"
              width={600}
              height={500}
            />
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="section-analytics">
        <div className="container grid-four">
          <div className="stat">
            <h2>500+</h2>
            <p>Projects Completed</p>
          </div>
          <div className="stat">
            <h2>50+</h2>
            <p>Happy Clients</p>
          </div>
          <div className="stat">
            <h2>10+</h2>
            <p>Years of Experience</p>
          </div>
          <div className="stat">
            <h2>100%</h2>
            <p>Client Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Third Section — mirrored hero (image left, text right) */}
      <section className="hero third-section">
        <div className="container grid-two">
          <div className="hero-image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-z58EZRxHWNAgnJWKRLyA-8Sg_YaP_9lM00_r_mUEniVTYTVdgbYk2Zjv&s=10"
              alt="About visual"
              width={600}
              height={500}
            />
          </div>

          <div className="hero-content">
            <h1>Design, Development, and Everything In Between</h1>
            <p>
              From landing pages to full-stack applications, we build
              products that are fast, accessible, and built to grow with
              your business.
            </p>
            <div className="hero-buttons">
              <NavLink to="/about" className="btn">
                Know More
              </NavLink>
              <NavLink to="/service" className="btn secondary-btn">
                Our Services
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;