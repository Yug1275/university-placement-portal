import React, { useEffect, useState } from "react";
import API from "../../services/api";

function Applications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const { data } = await API.get("/applications/my");
        setApps(data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'shortlisted': return 'applicants-status-shortlisted';
      case 'selected': return 'applicants-status-selected';
      case 'rejected': return 'applicants-status-rejected';
      case 'applied':
      default: return 'applicants-status-applied';
    }
  };

  return (
    <div className="manage-applications-page">
      <div className="applications-header">
        <h1 className="page-title"><span className="gradient-text">My Applications</span></h1>
        <p className="page-subtitle">Track the status of roles you have applied for.</p>
      </div>

      {loading ? (
        <div className="loading-state">Loading your applications...</div>
      ) : (
        <div className="applications-grid">
          {apps.length > 0 ? apps.map((app) => (
            <div key={app._id} className="student-application-card glass-card">
              <div className="app-card-header">
                <div>
                  <h3 className="app-job-title">{app.job?.title || "Unknown Role"}</h3>
                  <p className="app-company-name">{app.job?.company?.name || "Premium Company"}</p>
                </div>
                <div>
                  <span className={`applicants-status ${getStatusBadgeClass(app.status)}`}>
                    {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : "Applied"}
                  </span>
                </div>
              </div>
              
              <div className="app-card-details">
                <div className="detail-item">
                  <span className="detail-label">Applied On</span>
                  <span className="detail-val">
                    {app.createdAt ? new Date(app.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'short', day: 'numeric'
                    }) : "Recently"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Location</span>
                  <span className="detail-val">{app.job?.location || "Remote"}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Expected Salary</span>
                  <span className="detail-val">{app.job?.salary || "Competitive"}</span>
                </div>
              </div>
            </div>
          )) : (
            <div className="no-applications">
              <p>You haven't applied to any jobs yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Applications;