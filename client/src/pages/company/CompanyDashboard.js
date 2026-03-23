import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function CompanyDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome, {user?.companyName || user?.name} 🏢</h2>
        <p style={styles.sub}>Manage your job postings and applicants from here.</p>

        <div style={styles.btnGroup}>
          <Link to="/post-job" style={styles.btn}>+ Post New Job</Link>
          <Link to="/my-jobs" style={styles.btn}>📋 My Jobs</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  card: {
    width: "380px",
    padding: "35px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    color: "#fff",
    textAlign: "center",
  },
  title: { marginBottom: "10px" },
  sub: { marginBottom: "25px", opacity: 0.8 },
  btnGroup: { display: "flex", flexDirection: "column", gap: "12px" },
  btn: {
    padding: "10px",
    borderRadius: "10px",
    background: "#00c6ff",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default CompanyDashboard;