import React, { useEffect, useState } from "react";
import API from "../../services/api";

function Applications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      const { data } = await API.get("/applications/my");
      setApps(data);
    };
    fetchApps();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Applications</h2>

      <div style={styles.grid}>
        {apps.map((app) => (
          <div key={app._id} style={styles.card}>
            <h3>{app.job.title}</h3>
            <p><strong>Status:</strong> {app.status}</p>
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
};

export default Applications;