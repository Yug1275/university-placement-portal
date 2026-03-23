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
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          required
          style={styles.input}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          required
          style={styles.input}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          style={styles.input}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Role Selector */}
        <select
          style={styles.input}
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="company">Company</option>
        </select>

        {/* ✅ Student-only fields */}
        {form.role === "student" && (
          <>
            <input
              type="number"
              placeholder="CGPA (e.g. 8.5)"
              step="0.1"
              min="0"
              max="10"
              style={styles.input}
              value={form.cgpa}
              onChange={(e) => setForm({ ...form, cgpa: e.target.value })}
            />

            <input
              type="text"
              placeholder="Skills (e.g. React, Node, MongoDB)"
              style={styles.input}
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
            />
          </>
        )}

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    padding: "20px",
  },
  card: {
    width: "320px",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: {
    color: "#fff",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "#00c6ff",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  },
};

export default Register;