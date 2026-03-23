import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const { data } = await API.get("/jobs/my");
      setJobs(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await API.delete(`/jobs/${id}`);
      alert("Job deleted");
      fetchJobs();
    } catch (err) {
      alert("Error deleting job");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Posted Jobs</h2>

      {jobs.length === 0 && (
        <p style={{ color: "#fff" }}>No jobs posted yet.</p>
      )}

      <div style={styles.grid}>
        {jobs.map((job) => (
          <div key={job._id} style={styles.card}>
            <h3>{job.title}</h3>
            <p>{job.location} | {job.salary}</p>
            <p style={{ opacity: 0.7, fontSize: "13px" }}>{job.description}</p>

            <div style={styles.btnRow}>
              <button
                style={styles.btnView}
                onClick={() => navigate(`/applicants/${job._id}`)}
              >
                View Applicants
              </button>
              <button
                style={styles.btnDelete}
                onClick={() => deleteJob(job._id)}
              >
                Delete
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
  btnRow: { display: "flex", gap: "10px", marginTop: "12px" },
  btnView: {
    padding: "7px 12px",
    borderRadius: "8px",
    background: "#00c6ff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  btnDelete: {
    padding: "7px 12px",
    borderRadius: "8px",
    background: "#ff4f4f",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default MyJobs;