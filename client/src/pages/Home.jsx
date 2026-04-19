import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-container">

      {/* ── Hero Section ── */}
      <section className="hero-section">
        {/* Decorative soft blobs inside hero */}
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>

        <div className="hero-inner">
          {/* Left: Text */}
          <div className="hero-content">
            <span className="hero-tag">🎓 Campus Placement Made Simple</span>
            <h1 className="hero-title">
              Your Campus Career<br />
              <span className="gradient-text">Starts Here</span>
            </h1>
            <p className="hero-subtitle">
              Connect with top companies, track your applications, and land your
              dream job — all from one unified campus portal.
            </p>
            <div className="hero-ctas">
              <Link to="/register?role=student" className="btn-primary">
                Get Started as Student
              </Link>
              <Link to="/register?role=company" className="btn-secondary">
                Post a Job
              </Link>
            </div>
          </div>

          {/* Right: Static hero image */}
          <div className="hero-visual">
            <div className="hero-image-backdrop"></div>
            <img
              src="/hero-mockup.png"
              alt="Students ready for placements"
              className="hero-image"
              draggable="false"
            />
          </div>
        </div>
      </section>

      {/* ── White Area ── */}
      <div className="home-white-area">

        {/* Stats */}
        <section className="stats-section">
          <div className="stat-card">
            <h3 className="stat-number">500+</h3>
            <p className="stat-label">Students</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">100+</h3>
            <p className="stat-label">Companies</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">1000+</h3>
            <p className="stat-label">Jobs Posted</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">200+</h3>
            <p className="stat-label">Placed</p>
          </div>
        </section>

        {/* Features */}
        <section className="features-section">
          <h2 className="section-title">
            Platform <span className="gradient-text">Features</span>
          </h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrap blue-tint">
                <div className="feature-icon">🎓</div>
              </div>
              <h3>For Students</h3>
              <p>
                Browse exclusive campus opportunities, apply with one click,
                and track your application status in real-time.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrap purple-tint">
                <div className="feature-icon">🏢</div>
              </div>
              <h3>For Companies</h3>
              <p>
                Post job openings, manage applications, and shortlist top talent
                seamlessly from our talent pool.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrap green-tint">
                <div className="feature-icon">⚙️</div>
              </div>
              <h3>For Admin</h3>
              <p>
                Complete oversight of platform operations, user management,
                and detailed placement statistics.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works-section">
          <h2 className="section-title">
            How It <span className="gradient-text">Works</span>
          </h2>
          <div className="flows-container">
            <div className="flow-card glass-card">
              <h3>👨‍🎓 Student Flow</h3>
              <ul className="flow-steps">
                <li><span>1.</span> Register and complete your profile.</li>
                <li><span>2.</span> Browse available job postings.</li>
                <li><span>3.</span> Apply to matching opportunities.</li>
                <li><span>4.</span> Get shortlisted and placed!</li>
              </ul>
            </div>
            <div className="flow-card glass-card">
              <h3>🏢 Company Flow</h3>
              <ul className="flow-steps">
                <li><span>1.</span> Register your company.</li>
                <li><span>2.</span> Post detailed job requirements.</li>
                <li><span>3.</span> Review student applications.</li>
                <li><span>4.</span> Shortlist and hire talent!</li>
              </ul>
            </div>
          </div>
        </section>



      </div>
    </div>
  );
}

export default Home;