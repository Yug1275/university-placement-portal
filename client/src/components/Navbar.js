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
    <div className="navbar-nav">
      <h2>Placement Portal</h2>

      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Signup</Link>
          </>
        ) : (
          <>
            {/* Student links */}
            {user.role === "student" && (
              <>
                <Link to="/jobs" className="navbar-link">Jobs</Link>
                <Link to="/applications" className="navbar-link">My Applications</Link>
              </>
            )}

            {/* Company links */}
            {user.role === "company" && (
              <>
                <Link to="/post-job" className="navbar-link">Post Job</Link>
                <Link to="/my-jobs" className="navbar-link">My Jobs</Link>
              </>
            )}
            {/* Admin links */}

            {user.role === "admin" && (
              <>
                <Link to="/admin-dashboard" className="navbar-link">Dashboard</Link>
                <Link to="/admin/users" className="navbar-link">Users</Link>
                <Link to="/admin/companies" className="navbar-link">Companies</Link>
                <Link to="/admin/jobs" className="navbar-link">Jobs</Link>
              </>
            )}

            <span className="navbar-link navbar-user">Hi, {user.name}</span>
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;