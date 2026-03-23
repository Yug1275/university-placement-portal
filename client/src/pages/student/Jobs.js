import React, { useEffect, useState } from "react";
import API from "../../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await API.get("/jobs");
      setJobs(data);
    };
    fetchJobs();
  }, []);

  const applyJob = async (jobId) => {
    try {
      await API.post("/applications", { jobId });
      alert("Applied successfully");
    } catch (err) {
      alert(err?.response?.data?.message || "Error");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Jobs</h2>

      <div style={styles.grid}>
        {jobs.map((job) => (
          <div key={job._id} style={styles.card}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>

            <button
              style={styles.button}
              onClick={() => applyJob(job._id)}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  heading: {
    color: "#fff",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "15px",
    padding: "20px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    color: "#fff",
  },
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    border: "none",
    borderRadius: "8px",
    background: "#00bcd4",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Jobs;