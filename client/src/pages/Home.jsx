import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      {/* Floating Animated Background Elements */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">
          Your Campus Career <span className="gradient-text">Starts Here</span>
        </h1>
        <p className="hero-subtitle">
          Connect with top companies, track your applications, and land your dream job right from campus.
        </p>
        <div className="hero-ctas">
          <Link to="/register?role=student" className="btn-primary">Get Started as Student</Link>
          <Link to="/register?role=company" className="btn-secondary">Post a Job</Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-card glass-card">
          <h3 className="stat-number">500+</h3>
          <p className="stat-label">Students</p>
        </div>
        <div className="stat-card glass-card">
          <h3 className="stat-number">100+</h3>
          <p className="stat-label">Companies</p>
        </div>
        <div className="stat-card glass-card">
          <h3 className="stat-number">1000+</h3>
          <p className="stat-label">Jobs Posted</p>
        </div>
        <div className="stat-card glass-card">
          <h3 className="stat-number">200+</h3>
          <p className="stat-label">Placed</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Platform <span className="gradient-text">Features</span></h2>
        <div className="features-grid">
          <div className="feature-card glass-card">
            <div className="feature-icon">🎓</div>
            <h3>For Students</h3>
            <p>Browse exclusive campus opportunities, apply with one click, and track your application status in real-time.</p>
          </div>
          <div className="feature-card glass-card">
            <div className="feature-icon">🏢</div>
            <h3>For Companies</h3>
            <p>Post job openings, manage applications, and shortlist top talent seamlessly from our talent pool.</p>
          </div>
          <div className="feature-card glass-card">
            <div className="feature-icon">⚙️</div>
            <h3>For Admin</h3>
            <p>Complete oversight of platform operations, user management, and detailed placement statistics.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
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

      {/* Homepage Footer */}
      <footer className="home-footer glass-card">
        <div className="footer-content">
          <p className="developer-credits">Developed by <span className="gradient-text">Yug Patel & Meet Prajapati</span></p>
        </div>
      </footer>
    </div>
  );
}

export default Home;