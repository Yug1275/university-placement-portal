import React, { useState, useEffect, useRef } from "react";
import API from "../services/api";

function ProfilePanel({ user, onClose, onUpdate }) {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const panelRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/profile");
        setProfile(data);
        setForm({
          name: data.name || "",
          cgpa: data.cgpa || "",
          branch: data.branch || "",
          skills: data.skills?.join(", ") || "",
          companyName: data.companyName || "",
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);

      if (user.role === "student") {
        formData.append("cgpa", form.cgpa);
        formData.append("branch", form.branch);
        formData.append("skills", form.skills);
      }

      if (user.role === "company") {
        formData.append("companyName", form.companyName);
      }

      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const { data } = await API.put("/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile(data);
      setEditMode(false);
      setImageFile(null);

      const stored = JSON.parse(localStorage.getItem("user"));
      const updated = {
        ...stored,
        name: data.name,
        profileImage: data.profileImage,
      };
      localStorage.setItem("user", JSON.stringify(updated));
      onUpdate(updated);

      alert("Profile updated successfully!");
    } catch (err) {
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace("/api", "") : "http://localhost:5000";
  
  const imageUrl = imagePreview
    ? imagePreview
    : profile?.profileImage
    ? (profile.profileImage.startsWith("http") || profile.profileImage.startsWith("data:")
        ? profile.profileImage
        : `${API_BASE}${profile.profileImage.startsWith('/') ? '' : '/'}${profile.profileImage}`)
    : null;

  const roleColor = {
    student: "#00c6ff",
    company: "#4caf50",
    admin: "#e91e63",
  };

  return (
    <div className="profile-overlay">
      <div ref={panelRef} className="profile-panel">

        {/* Header */}
        <div className="profile-header">
          <span className="profile-header-title">My Profile</span>
          <button className="profile-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Avatar */}
        <div className="profile-avatar-section">
          <div className="profile-avatar-wrapper">
            {imageUrl ? (
              <img src={imageUrl} alt="profile" className="profile-avatar-img" />
            ) : (
              <div className="profile-avatar-fallback">
                {profile?.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}

            {editMode && (
              <label className="profile-camera-btn">
                📷
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          <span
            className="profile-role-badge"
            style={{
              background: `${roleColor[profile?.role]}22`,
              border: `1px solid ${roleColor[profile?.role]}44`,
              color: roleColor[profile?.role],
            }}
          >
            {profile?.role}
          </span>
        </div>

        {/* Info / Edit */}
        {!editMode ? (
          <div className="profile-info-section">
            <div className="profile-info-row">
              <span className="profile-info-label">Name</span>
              <span className="profile-info-value">{profile?.name}</span>
            </div>
            <div className="profile-info-row">
              <span className="profile-info-label">Email</span>
              <span className="profile-info-value">{profile?.email}</span>
            </div>

            {profile?.role === "student" && (
              <>
                <div className="profile-info-row">
                  <span className="profile-info-label">CGPA</span>
                  <span className="profile-info-value">{profile?.cgpa || "N/A"}</span>
                </div>
                <div className="profile-info-row">
                  <span className="profile-info-label">Branch</span>
                  <span className="profile-info-value">{profile?.branch || "N/A"}</span>
                </div>
                <div className="profile-info-row">
                  <span className="profile-info-label">Skills</span>
                  <span className="profile-info-value">
                    {profile?.skills?.length > 0
                      ? profile.skills.join(", ")
                      : "N/A"}
                  </span>
                </div>
              </>
            )}

            {profile?.role === "company" && (
              <div className="profile-info-row">
                <span className="profile-info-label">Company</span>
                <span className="profile-info-value">{profile?.companyName || "N/A"}</span>
              </div>
            )}

            <button className="profile-edit-btn" onClick={() => setEditMode(true)}>
              ✏️ Edit Profile
            </button>
          </div>
        ) : (
          <div className="profile-info-section">
            <input
              className="profile-input"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            {user.role === "student" && (
              <>
                <input
                  className="profile-input"
                  placeholder="CGPA"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={form.cgpa}
                  onChange={(e) => setForm({ ...form, cgpa: e.target.value })}
                />
                <input
                  className="profile-input"
                  placeholder="Branch (e.g. CSE)"
                  value={form.branch}
                  onChange={(e) => setForm({ ...form, branch: e.target.value })}
                />
                <input
                  className="profile-input"
                  placeholder="Skills (comma separated)"
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                />
              </>
            )}

            {user.role === "company" && (
              <input
                className="profile-input"
                placeholder="Company Name"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              />
            )}

            <div className="profile-btn-row">
              <button
                className="profile-save-btn"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "💾 Save"}
              </button>
              <button
                className="profile-cancel-btn"
                onClick={() => {
                  setEditMode(false);
                  setImagePreview(null);
                  setImageFile(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Footer / Logout */}
        <div className="profile-footer">
          <button
            className="profile-logout-btn"
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
          >
            🚪 Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProfilePanel;