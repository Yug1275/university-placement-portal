import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.nav}>
      <h2>Placement Portal</h2>

      <div style={styles.right}>
        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Signup</Link>
          </>
        ) : (
          <>
            {/* Student links */}
            {user.role === "student" && (
              <>
                <Link to="/jobs" style={styles.link}>Jobs</Link>
                <Link to="/applications" style={styles.link}>My Applications</Link>
              </>
            )}

            {/* Company links */}
            {user.role === "company" && (
              <>
                <Link to="/post-job" style={styles.link}>Post Job</Link>
                <Link to="/my-jobs" style={styles.link}>My Jobs</Link>
              </>
            )}

            <span style={{ ...styles.link, opacity: 0.7 }}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#111",
    color: "#fff",
  },
  right: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    marginLeft: "15px",
    color: "#fff",
    textDecoration: "none",
  },
  button: {
    marginLeft: "15px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default Navbar;