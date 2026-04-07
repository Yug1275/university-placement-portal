import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ProfilePanel from "./ProfilePanel";

function Navbar() {
  const { user, login } = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);

  const imageUrl = user?.profileImage
    ? (user.profileImage.startsWith("http") ? user.profileImage : `http://localhost:5000${user.profileImage.startsWith('/') ? '' : '/'}${user.profileImage}`)
    : null;

  return (
    <>
      <nav className="navbar-nav">
        <Link to="/" className="navbar-brand-link">
          <h2>Placement Portal</h2>
        </Link>

        <div className="navbar-right">
          {!user ? (
            <>
              <Link to="/" className="navbar-link">Home</Link>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Signup</Link>
            </>
          ) : (
            <>
              {user.role === "student" && (
                <>
                  <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                  <Link to="/jobs" className="navbar-link">Jobs</Link>
                  <Link to="/applications" className="navbar-link">My Applications</Link>
                </>
              )}

              {user.role === "company" && (
                <>
                  <Link to="/company-dashboard" className="navbar-link">Dashboard</Link>
                  <Link to="/post-job" className="navbar-link">Post Job</Link>
                  <Link to="/my-jobs" className="navbar-link">My Jobs</Link>
                </>
              )}

              {user.role === "admin" && (
                <>
                  <Link to="/admin-dashboard" className="navbar-link">Dashboard</Link>
                  <Link to="/admin/users" className="navbar-link">Users</Link>
                  <Link to="/admin/companies" className="navbar-link">Companies</Link>
                  <Link to="/admin/jobs" className="navbar-link">Jobs</Link>
                </>
              )}

              <div
                className="navbar-avatar-wrapper"
                onClick={() => setShowProfile(true)}
                title="My Profile"
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="profile" className="navbar-avatar-img" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                ) : (
                  <div className="navbar-avatar-fallback">
                    {(user?.companyName || user?.name || "?").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </nav>

      {showProfile && (
        <ProfilePanel
          user={user}
          onClose={() => setShowProfile(false)}
          onUpdate={(updatedUser) => {
            login(updatedUser);
            setShowProfile(false);
          }}
        />
      )}
    </>
  );
}

export default Navbar;