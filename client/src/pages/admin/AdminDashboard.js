import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCompanies: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/admin/stats");
        setStats(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Students", value: stats.totalStudents, tone: "blue" },
    { label: "Total Companies", value: stats.totalCompanies, tone: "green" },
    { label: "Total Jobs", value: stats.totalJobs, tone: "orange" },
    { label: "Total Applications", value: stats.totalApplications, tone: "pink" },
  ];

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-heading">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="admin-dashboard-grid">
        {statCards.map((card) => (
          <div key={card.label} className="admin-dashboard-card">
            <h3 className={`admin-dashboard-stat admin-dashboard-stat-${card.tone}`}>
              {card.value}
            </h3>
            <p>{card.label}</p>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="admin-dashboard-nav-grid">
        <Link to="/admin/users" className="admin-dashboard-nav-btn">
          👥 Manage Users
        </Link>
        <Link to="/admin/companies" className="admin-dashboard-nav-btn">
          🏢 Manage Companies
        </Link>
        <Link to="/admin/jobs" className="admin-dashboard-nav-btn">
          💼 Manage Jobs
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;