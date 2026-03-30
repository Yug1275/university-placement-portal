import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    cgpa: "",
    skills: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        skills:
          form.role === "student"
            ? form.skills.split(",").map((s) => s.trim()).filter(Boolean)
            : [],
        cgpa:
          form.role === "student" ? parseFloat(form.cgpa) : undefined,
      };

      await API.post("/auth/register", payload);
      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Error");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-card">
        <h2 className="register-title">Create Account</h2>

        {/* Role Selector */}
        <select
          className="register-input"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="company">Company</option>
        </select>

        <input
          type="text"
          placeholder="Full Name"
          required
          className="register-input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          required
          className="register-input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="register-input"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        

        {/*  Student-only fields */}
        {form.role === "student" && (
          <>
            <input
              type="number"
              placeholder="CGPA (e.g. 8.5)"
              step="0.1"
              min="0"
              max="10"
              className="register-input"
              value={form.cgpa}
              onChange={(e) => setForm({ ...form, cgpa: e.target.value })}
            />

            <input
              type="text"
              placeholder="Skills (e.g. React, Node, MongoDB)"
              className="register-input"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
            />
          </>
        )}

        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;