import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <div className="footer-grid">

          {/* Column 1: Brand */}
          <div className="footer-col">
            <div className="footer-brand">
              <span className="footer-brand-icon">🎓</span>
              <span className="footer-brand-name">Placement Portal</span>
            </div>
            <p className="footer-desc">
              Helping students get placed efficiently and connecting talent with opportunity.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Navigation</h4>
            <ul className="footer-links-list">
              <li><Link to="/dashboard" className="footer-link">Dashboard</Link></li>
              <li><Link to="/jobs" className="footer-link">Jobs</Link></li>
              <li><Link to="/applications" className="footer-link">Applications</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Resources</h4>
            <ul className="footer-links-list">
              <li><a href="#" className="footer-link">Documentation</a></li>
              <li><a href="#" className="footer-link">Help &amp; Support</a></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Connect</h4>
            <ul className="footer-links-list">
              <li>
                <a href="https://github.com/Yug1275/university-placement-portal.git" target="_blank" rel="noreferrer" className="footer-link footer-social-link">
                  <span className="footer-social-icon"></span> GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/yugpatel040205/" target="_blank" rel="noreferrer" className="footer-link footer-social-link">
                  <span className="footer-social-icon"></span> LinkedIn
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Strip */}
      <div className="footer-bottom">
        <p>© 2026 Developed by <strong>Yug &amp; Meet</strong></p>
      </div>
    </footer>
  );
}

export default Footer;