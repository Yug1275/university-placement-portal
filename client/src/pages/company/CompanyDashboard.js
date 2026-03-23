import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function CompanyDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="company-dashboard-container">
      <div className="company-dashboard-card">
        <h2 className="company-dashboard-title">Welcome, {user?.companyName || user?.name} 🏢</h2>
        <p className="company-dashboard-sub">Manage your job postings and applicants from here.</p>

        <div className="company-dashboard-btn-group">
          <Link to="/post-job" className="company-dashboard-btn">+ Post New Job</Link>
          <Link to="/my-jobs" className="company-dashboard-btn">📋 My Jobs</Link>
        </div>
      </div>
    </div>
  );
}

export default CompanyDashboard;