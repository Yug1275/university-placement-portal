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

  const statusColor = {
    applied: "#aaa",
    shortlisted: "#00c6ff",
    selected: "#4caf50",
    rejected: "#ff4f4f",
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Applicants</h2>

      {apps.length === 0 && (
        <p style={{ color: "#fff" }}>No applicants yet.</p>
      )}

      <div style={styles.grid}>
        {apps.map((app) => (
          <div key={app._id} style={styles.card}>
            <h3>{app.student?.name || "Unknown"}</h3>
            <p>📧 {app.student?.email || "N/A"}</p>
            <p>🎓 CGPA: {app.student?.cgpa ?? "N/A"}</p>
            <p>🔧 Skills: {app.student?.skills?.length > 0
              ? app.student.skills.join(", ")
              : "N/A"}
            </p>

            <p style={{ color: statusColor[app.status], fontWeight: "bold" }}>
              Status: {app.status}
            </p>

            <div style={styles.btnRow}>
              <button
                style={{ ...styles.btn, background: "#00c6ff" }}
                onClick={() => updateStatus(app._id, "shortlisted")}
              >
                Shortlist
              </button>
              <button
                style={{ ...styles.btn, background: "#4caf50" }}
                onClick={() => updateStatus(app._id, "selected")}
              >
                Select
              </button>
              <button
                style={{ ...styles.btn, background: "#ff4f4f" }}
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

const styles = {
  container: { padding: "20px" },
  heading: { color: "#fff", marginBottom: "20px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "rgba(255,255,255,0.1)",
    borderRadius: "15px",
    padding: "20px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    color: "#fff",
  },
  btnRow: {
    display: "flex",
    gap: "8px",
    marginTop: "12px",
    flexWrap: "wrap"
  },
  btn: {
    padding: "6px 10px",
    borderRadius: "8px",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
  },
};

export default Applicants;