import { useAuth } from "../store/auth";
import "../index.css";

const Service = () => {
  const { services } = useAuth();

  return (
    <section className="services-page">

      {/* =================================================
          MASSIVE HERO
      ================================================= */}

      <section className="services-hero">

        {/* Animated background */}
        <div className="hero-grid"></div>

        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="hero-glow hero-glow-3"></div>

        {/* Floating tech elements */}
        <div className="tech-float tech-float-1">
          {"<API />"}
        </div>

        <div className="tech-float tech-float-2">
          {"{ JSON }"}
        </div>

        <div className="tech-float tech-float-3">
          {"MongoDB"}
        </div>

        <div className="tech-float tech-float-4">
          {"React"}
        </div>


        <div className="services-hero-inner">

          <div className="hero-badge">
            <span className="live-dot"></span>
            BACKEND POWERED SERVICES
          </div>


          <h1>
            We Build
            <br />
            <span>Digital Experiences.</span>
          </h1>


          <p className="hero-description">
            Powerful web solutions, modern interfaces and scalable
            technology — delivered through a complete backend-powered
            service platform.
          </p>


          {/* API status */}

          <div className="hero-api-status">

            <div className="api-status-left">
              <span className="api-pulse"></span>

              <span>LIVE API</span>
            </div>

            <div className="api-line"></div>

            <span>
              {services.length} services loaded
            </span>

          </div>


          {/* Hero stats */}

          <div className="hero-stats">

            <div className="hero-stat">
              <strong>10+</strong>
              <span>Solutions</span>
            </div>

            <div className="stat-divider"></div>

            <div className="hero-stat">
              <strong>100%</strong>
              <span>Responsive</span>
            </div>

            <div className="stat-divider"></div>

            <div className="hero-stat">
              <strong>24/7</strong>
              <span>Support</span>
            </div>

          </div>

        </div>


        {/* Scroll indicator */}

        <div className="hero-scroll">
          <span>SCROLL TO EXPLORE</span>
          <div className="scroll-line"></div>
        </div>

      </section>



      {/* =================================================
          SERVICES INTRO
      ================================================= */}

      <section className="services-intro">

        <div className="container">

          <div className="intro-left">

            <span className="section-label">
              WHAT WE DO
            </span>

            <h2>
              Solutions that
              <br />
              <span>move businesses forward.</span>
            </h2>

          </div>


          <div className="intro-right">

            <p>
              From websites and applications to backend systems
              and APIs, we create digital products that are fast,
              scalable and built for real-world use.
            </p>

            <div className="intro-line"></div>

            <span className="dynamic-text">
              ↓ Explore our capabilities
            </span>

          </div>

        </div>

      </section>



      {/* =================================================
          SERVICES GRID
      ================================================= */}

      <section className="services-list">

        <div className="container">

          <div className="services-top">

            <div>
              <span className="section-label">
                OUR EXPERTISE
              </span>

              <h2>
                Featured Services
              </h2>
            </div>

            <div className="service-count">
              <span>AVAILABLE</span>
              <strong>
                {String(services.length).padStart(2, "0")}
              </strong>
            </div>

          </div>


          <div className="services-container">

            {services.map((service, index) => (

              <article
                className="service-card"
                key={service._id || index}
              >

                {/* Number */}

                <div className="card-number">
                  {String(index + 1).padStart(2, "0")}
                </div>


                {/* Image */}

                <div className="service-image">

                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdwwb8CNPBlfykFj4K4ofx59RkH0uV8vNtUUHdgQ9iHoLU8eszOD4oYoNV&s=10"
                    alt={service.service}
                  />

                  <div className="image-gradient"></div>

                  <div className="card-hover-text">
                    EXPLORE →
                  </div>

                </div>


                {/* Content */}

                <div className="service-details">

                  <div className="service-title-row">

                    <h3>
                      {service.service}
                    </h3>

                    <span className="arrow-icon">
                      ↗
                    </span>

                  </div>


                  <p className="service-description">
                    {service.description}
                  </p>


                  <div className="service-meta">

                    <div>
                      <span>PROVIDER</span>
                      <strong>
                        {service.provider}
                      </strong>
                    </div>

                    <div className="price-box">
                      <span>STARTING FROM</span>
                      <strong>
                        {service.price}
                      </strong>
                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>



      {/* =================================================
          BOTTOM CTA
      ================================================= */}

      <section className="services-cta">

        <div className="cta-glow"></div>

        <div className="container">

          <span className="section-label">
            HAVE A PROJECT?
          </span>

          <h2>
            Let's build something
            <span> extraordinary.</span>
          </h2>

          <p>
            Have an idea in mind? Let's turn it into a powerful
            digital experience.
          </p>

          <button className="cta-button">
            Start a Conversation
            <span>→</span>
          </button>

        </div>

      </section>

    </section>
  );
};

export default Service;