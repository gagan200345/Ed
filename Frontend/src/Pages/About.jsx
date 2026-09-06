import { Link } from "react-router-dom";
import "./About.css";


const features = [
  {
    title: "Project-first",
    text: "Every lesson ends with something real in your project folder — not a note, not a snippet, an app you can open and run.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 6 3 12l5 6" />
        <path d="M16 6l5 6-5 6" />
      </svg>
    ),
  },
  {
    title: "No skipped steps",
    text: "Validation, error states, responsive layout, empty pages — we build the parts most tutorials cut, in the order you'll actually need them.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h4v-4H3v4Z" />
        <path d="M9 21h4v-8H9v8Z" />
        <path d="M15 21h4V9h-4v12Z" />
        <path d="M15 5h4" />
      </svg>
    ),
  },
  {
    title: "Built with you",
    text: "New tracks come from what learners ask for in the comments and the community chat — you're shaping the syllabus as much as we are.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="8" r="3" />
        <circle cx="17.5" cy="10.5" r="2.3" />
        <path d="M4 20c0-3 2.4-5.2 5-5.2s5 2.2 5 5.2" />
        <path d="M15 20c.2-2.1 1.7-3.7 3.6-4" />
      </svg>
    ),
  },
  {
    title: "Learn at your pace",
    text: "Every track stays unlocked after you finish it, so you can revisit a lesson or rebuild a project whenever you need the refresher.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
];

const missionVision = [
  {
    label: "Mission",
    title: "Teach the parts tutorials skip",
    text: "Validation, empty states, the routes nobody demos — we build the whole app together, so what you finish with keeps working once the tutorial ends.",
  },
  {
    label: "Vision",
    title: "A syllabus shaped by builders",
    text: "Courses that change as fast as the tools do, expanded from what learners are actually trying to build in the community workspace.",
  },
];

const timeline = [
  {
    year: "2021",
    text: "Started publishing weekly build-along tutorials — the first one was a to-do app that took three tries to get right on camera.",
  },
  {
    year: "2023",
    text: "Launched the first full-stack track, pairing a React front end with a Node and MongoDB back end for every project.",
  },
  {
    year: "2024",
    text: "Opened the community workspace, where learners publish the apps they've shipped and get feedback from each other.",
  },
  {
    year: "2026",
    text: "Rebuilt the platform end to end — new courses, a redesigned classroom, and this page along with it.",
  },
];

export default function About() {
  return (
    <main className="about">
      {/* Hero ------------------------------------------------------- */}
      <section className="about-hero">
        <div className="about-hero__glow" aria-hidden="true"></div>
        <div className="container about-hero__inner">
          <h1 className="about-heading">
            We teach people to build, not just to code.
          </h1>
          <p className="about-lede">
            Codenest began as a series of late-night tutorials for developers
            who wanted more than syntax definitions — real applications, real
            bugs, and real fixes. It's grown into a place where thousands of
            people learn to ship software one project at a time.
          </p>
          <dl className="about-stats">
            <div className="about-stat">
              <dt>180+</dt>
              <dd>hours of project-based lessons</dd>
            </div>
            <div className="about-stat">
              <dt>12,400</dt>
              <dd>builders in the community</dd>
            </div>
            <div className="about-stat">
              <dt>6</dt>
              <dd>full-stack apps shipped per track</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Who we are --------------------------------------------------- */}
      <section className="about-story">
        <div className="container about-story__inner">
          <div className="about-story__text">
            <h2>From tutorials to a full curriculum</h2>
            <p>
              It started with a single comment: "can you show the whole
              thing, start to finish?" That request became Codenest's
              teaching style — no shortcuts, no steps left as an exercise for
              the reader. Every course builds one complete application: pages
              that connect to each other, forms that save real data, and the
              routes that even production apps forget — like the page you
              land on when nothing else matches.
            </p>
            <p>
              You won't just watch code appear. You'll hit the same warnings
              we hit, fix the same typos, and understand why the fix works —
              so the next bug is one you can solve on your own.
            </p>
          </div>
          <div className="code-card" aria-hidden="true">
            <div className="code-card__bar">
              <span></span>
              <span></span>
              <span></span>
              <p>Routes.jsx</p>
            </div>
            <pre className="code-card__body">
<code>{`<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="*" element={<Error />} />
</Routes>`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Mission & vision ---------------------------------------------- */}
      <section className="about-mission">
        <div className="container">
          <h2>Why this exists</h2>
          <div className="mission-panel">
            {missionVision.map((item) => (
              <div className="mission-half" key={item.label}>
                <p className="mission-label">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us -------------------------------------------------- */}
      <section className="about-values">
        <div className="container">
          <h2>What stays true across every course</h2>
          <ul className="values-list">
            {features.map((feature) => (
              <li className="value-item" key={feature.title}>
                <span className="value-icon">{feature.icon}</span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Our journey ------------------------------------------------- */}
      <section className="about-timeline">
        <div className="container">
          <h2>The short version of how we got here</h2>
          <ol className="timeline">
            {timeline.map((item) => (
              <li className="timeline-item" key={item.year}>
                <span className="timeline-year">{item.year}</span>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Call to action ------------------------------------------------ */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta__inner">
            <h2>Start with the project you actually want to build.</h2>
            <p>
              Pick a track, follow along, and finish with something real in
              your own repository.
            </p>
            <Link to="/register" className="btn btn-primary">
              Create your account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}