import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    eligibility: "",
    skillsRequired: "",
    deadline: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/jobs", {
        ...form,
        skillsRequired: form.skillsRequired.split(",").map((s) => s.trim()),
      });
      alert("Job posted successfully!");
      navigate("/my-jobs");
    } catch (err) {
      alert(err?.response?.data?.message || "Error posting job");
    }
  };

  const fields = [
    { key: "title", placeholder: "Job Title" },
    { key: "description", placeholder: "Job Description" },
    { key: "location", placeholder: "Location" },
    { key: "salary", placeholder: "Salary (e.g. 8 LPA)" },
    { key: "eligibility", placeholder: "Eligibility (e.g. CGPA >= 7)" },
    { key: "skillsRequired", placeholder: "Skills (comma separated)" },
  ];

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Post a New Job</h2>

        {fields.map((f) => (
          <input
            key={f.key}
            placeholder={f.placeholder}
            required
            style={styles.input}
            value={form[f.key]}
            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
          />
        ))}

        <input
          type="date"
          required
          style={styles.input}
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
        />

        <button type="submit" style={styles.button}>Post Job</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    padding: "20px",
  },
  card: {
    width: "380px",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  title: { color: "#fff", textAlign: "center", marginBottom: "5px" },
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

export default PostJob;