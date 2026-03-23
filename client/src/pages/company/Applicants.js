import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useParams } from "react-router-dom";

function Applicants() {
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    // ✅ fetchApps moved inside useEffect — fixes warning
    const fetchApps = async () => {
      try {
        const { data } = await API.get(`/applications/job/${jobId}`);
        const validApps = data.filter((app) => app.student !== null);
        setApps(validApps);
      } catch (err) {
        console.log(err);
      }
    };

    fetchApps();
  }, [jobId]);

  const updateStatus = async (appId, status) => {
    try {
      await API.put(`/applications/${appId}/status`, { status });
      alert(`Status updated to: ${status}`);

      // ✅ Re-fetch after status update
      const { data } = await API.get(`/applications/job/${jobId}`);
      const validApps = data.filter((app) => app.student !== null);
      setApps(validApps);

    } catch (err) {
      alert("Error updating status");
    }
  };

  const statusClass = {
    applied: "applicants-status-applied",
    shortlisted: "applicants-status-shortlisted",
    selected: "applicants-status-selected",
    rejected: "applicants-status-rejected",
  };

  return (
    <div className="applicants-container">
      <h2 className="applicants-heading">Applicants</h2>

      {apps.length === 0 && (
        <p className="applicants-empty">No applicants yet.</p>
      )}

      <div className="applicants-grid">
        {apps.map((app) => (
          <div key={app._id} className="applicants-card">
            <h3>{app.student?.name || "Unknown"}</h3>
            <p>📧 {app.student?.email || "N/A"}</p>
            <p>🎓 CGPA: {app.student?.cgpa ?? "N/A"}</p>
            <p>🔧 Skills: {app.student?.skills?.length > 0
              ? app.student.skills.join(", ")
              : "N/A"}
            </p>

            <p className={`applicants-status ${statusClass[app.status]}`}>
              Status: {app.status}
            </p>

            <div className="applicants-btn-row">
              <button
                className="applicants-btn applicants-btn-shortlist"
                onClick={() => updateStatus(app._id, "shortlisted")}
              >
                Shortlist
              </button>
              <button
                className="applicants-btn applicants-btn-select"
                onClick={() => updateStatus(app._id, "selected")}
              >
                Select
              </button>
              <button
                className="applicants-btn applicants-btn-reject"
                onClick={() => updateStatus(app._id, "rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applicants;