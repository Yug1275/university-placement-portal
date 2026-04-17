import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import API from "../../services/api";

function Dashboard() {
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({
    jobsAvailable: 0,
    applicationsSent: 0,
    shortlisted: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, appsRes] = await Promise.all([
          API.get("/jobs"),
          API.get("/applications/my")
        ]);

        const jobs = jobsRes.data;
        const apps = appsRes.data;

        setStats({
          jobsAvailable: jobs.length,
          applicationsSent: apps.length,
          shortlisted: apps.filter(a => a.status === "shortlisted" || a.status === "selected").length
        });

        // Generate dynamic recent activity
        const activities = [];
        
        // Add up to 2 recent applications
        apps.slice(0, 2).forEach(app => {
          let type = "purple";
          if (app.status === "shortlisted" || app.status === "selected") type = "green";
          
          activities.push({
            id: `app-${app._id}`,
            html: `Your application for <strong>${app.job?.title || "a job"}</strong> is <strong>${app.status}</strong>`,
            type: type,
            time: "Recently"
          });
        });

        // Add up to 2 recent jobs
        jobs.slice(-2).reverse().forEach(job => {
          activities.push({
            id: `job-${job._id}`,
            html: `New job posted: <strong>${job.title}</strong>`,
            type: "blue",
            time: "Recently"
          });
        });

        setRecentActivity(activities);
      } catch (err) {
        console.error("Error fetching dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="student-dashboard-container">
      {/* Welcome Card */}
      <div className="dashboard-welcome-card glass-card">
        <div className="welcome-content">
          <h1 className="welcome-title">Welcome back, <span className="gradient-text">{user?.name}</span> 👋</h1>
          <p className="welcome-subtitle">Here is your daily career update. Let's get you placed!</p>
        </div>
        <div className="welcome-actions">
          <Link to="/jobs" className="btn-primary">Browse Jobs</Link>
          <Link to="/applications" className="btn-secondary">My Applications</Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="dashboard-stats-row">
        <div className="student-stat-card glass-card">
          <div className="stat-icon-wrapper blue">💼</div>
          <div className="stat-info">
            <h3>{loading ? "-" : stats.jobsAvailable}</h3>
            <p>New Jobs Available</p>
          </div>
        </div>
        <div className="student-stat-card glass-card">
          <div className="stat-icon-wrapper purple">📄</div>
          <div className="stat-info">
            <h3>{loading ? "-" : stats.applicationsSent}</h3>
            <p>Applications Sent</p>
          </div>
        </div>
        <div className="student-stat-card glass-card">
          <div className="stat-icon-wrapper green">🌟</div>
          <div className="stat-info">
            <h3>{loading ? "-" : stats.shortlisted}</h3>
            <p>Shortlisted</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dashboard-activity-section glass-card">
        <h2 className="section-heading">Recent Activity</h2>
        <div className="activity-list">
          {loading ? (
            <p style={{ color: "#aaa" }}>Loading activity...</p>
          ) : recentActivity.length > 0 ? (
            recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-dot ${activity.type}`}></div>
                <div className="activity-details">
                  <p className="activity-text" dangerouslySetInnerHTML={{ __html: activity.html }}></p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "#aaa" }}>No recent activity to show.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;