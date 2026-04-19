import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import ProfilePanel from "./ProfilePanel";

function Navbar() {
  const { user, login } = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();

  const imageUrl = user?.profileImage
    ? (user.profileImage.startsWith("http") || user.profileImage.startsWith("data:") 
        ? user.profileImage 
        : `${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace("/api", "") : "https://university-placement-portal-production.up.railway.app"}${user.profileImage.startsWith('/') ? '' : '/'}${user.profileImage}`)
    : null;

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="navbar-nav">
        <Link to="/" className="navbar-brand-link">
          <div className="navbar-brand">
            <span className="navbar-brand-icon">🎓</span>
            <h2>Placement Portal</h2>
          </div>
        </Link>

        <div className="navbar-right">
          {!user ? (
            <>
              <Link to="/" className={`navbar-link${isActive("/") ? " navbar-link-active" : ""}`}>Home</Link>
              <Link to="/login" className={`navbar-link${isActive("/login") ? " navbar-link-active" : ""}`}>Login</Link>
              <Link to="/register" className="navbar-cta-btn">Sign Up</Link>
            </>
          ) : (
            <>
              {user.role === "student" && (
                <>
                  <Link to="/dashboard" className={`navbar-link${isActive("/dashboard") ? " navbar-link-active" : ""}`}>Dashboard</Link>
                  <Link to="/jobs" className={`navbar-link${isActive("/jobs") ? " navbar-link-active" : ""}`}>Jobs</Link>
                  <Link to="/applications" className={`navbar-link${isActive("/applications") ? " navbar-link-active" : ""}`}>My Applications</Link>
                </>
              )}

              {user.role === "company" && (
                <>
                  <Link to="/company-dashboard" className={`navbar-link${isActive("/company-dashboard") ? " navbar-link-active" : ""}`}>Dashboard</Link>
                  <Link to="/post-job" className={`navbar-link${isActive("/post-job") ? " navbar-link-active" : ""}`}>Post Job</Link>
                  <Link to="/my-jobs" className={`navbar-link${isActive("/my-jobs") ? " navbar-link-active" : ""}`}>My Jobs</Link>
                </>
              )}

              {user.role === "admin" && (
                <>
                  <Link to="/admin-dashboard" className={`navbar-link${isActive("/admin-dashboard") ? " navbar-link-active" : ""}`}>Dashboard</Link>
                  <Link to="/admin/users" className={`navbar-link${isActive("/admin/users") ? " navbar-link-active" : ""}`}>Users</Link>
                  <Link to="/admin/companies" className={`navbar-link${isActive("/admin/companies") ? " navbar-link-active" : ""}`}>Companies</Link>
                  <Link to="/admin/jobs" className={`navbar-link${isActive("/admin/jobs") ? " navbar-link-active" : ""}`}>Jobs</Link>
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