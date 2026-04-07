import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import API from "../../services/api";

function CompanyDashboard() {
  const { user } = useContext(AuthContext);
  
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplicants: 0,
    newApplicants: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch company jobs
        const jobsRes = await API.get("/jobs/my");
        const jobs = jobsRes.data;
        
        let applicantsCount = 0;
        let newAppsCount = 0;
        let allApps = [];

        // Fetch applications for all active jobs
        // MERN portfolio scale is small enough to use Promise.all over jobs
        const appsPromises = jobs.map(job => API.get(`/applications/job/${job._id}`));
        const appsResults = await Promise.all(appsPromises);

        appsResults.forEach((res, index) => {
          const jobApps = res.data;
          applicantsCount += jobApps.length;
          // Count pending 'applied' as new
          newAppsCount += jobApps.filter(a => a.status === 'applied').length;
          
          // Inject job details for activity tracking
          jobApps.forEach(app => {
            allApps.push({ ...app, jobContext: jobs[index] });
          });
        });

        // Set stats
        setStats({
          activeJobs: jobs.length,
          totalApplicants: applicantsCount,
          newApplicants: newAppsCount
        });

        // Generate activity
        const activities = [];

        // 1. Job post activity
        jobs.slice(-2).reverse().forEach(job => {
          activities.push({
            id: `job-${job._id}`,
            html: `You successfully posted a new job: <strong>${job.title}</strong>`,
            type: "blue",
            timestamp: job.createdAt ? new Date(job.createdAt).getTime() : Date.now() - 10000
          });
        });

        // 2. Application activity
        allApps.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });

        allApps.slice(0, 3).forEach(app => {
          activities.push({
            id: `app-${app._id}`,
            html: `<strong>${app.student?.name || "A student"}</strong> applied for <strong>${app.jobContext?.title || "a job"}</strong>`,
            type: "green",
            timestamp: app.createdAt ? new Date(app.createdAt).getTime() : Date.now()
          });
        });

        // Sort combined activity by time
        activities.sort((a, b) => b.timestamp - a.timestamp);
        
        setRecentActivity(activities.slice(0, 4));

      } catch (err) {
        console.error("Error fetching company dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="company-dashboard-page student-dashboard-container">
      {/* Welcome Card */}
      <div className="dashboard-welcome-card company-welcome glass-card">
        <div className="welcome-content">
          <h1 className="welcome-title">Welcome, <span className="gradient-text">{user?.companyName || user?.name}</span> 🏢</h1>
          <p className="welcome-subtitle">Manage your recruiting pipeline and discover top talent.</p>
        </div>
        <div className="welcome-actions">
          <Link to="/post-job" className="btn-primary">+ Post New Job</Link>
          <Link to="/my-jobs" className="btn-secondary">📋 My Jobs</Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="dashboard-stats-row">
        <div className="student-stat-card glass-card">
          <div className="stat-icon-wrapper blue">💼</div>
          <div className="stat-info">
            <h3>{loading ? "-" : stats.activeJobs}</h3>
            <p>Active Job Postings</p>
          </div>
        </div>
        <div className="student-stat-card glass-card">
          <div className="stat-icon-wrapper purple">👥</div>
          <div className="stat-info">
            <h3>{loading ? "-" : stats.totalApplicants}</h3>
            <p>Total Applicants</p>
          </div>
        </div>
        <div className="student-stat-card glass-card">
          <div className="stat-icon-wrapper green">🌟</div>
          <div className="stat-info">
            <h3>{loading ? "-" : stats.newApplicants}</h3>
            <p>New / Pending Reviews</p>
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
                  <span className="activity-time">Recently</span>
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

export default CompanyDashboard;