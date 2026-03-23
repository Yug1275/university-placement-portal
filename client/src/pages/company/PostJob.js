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
    <div className="post-job-container">
      <form onSubmit={handleSubmit} className="post-job-card">
        <h2 className="post-job-title">Post a New Job</h2>

        {fields.map((f) => (
          <input
            key={f.key}
            placeholder={f.placeholder}
            required
            className="post-job-input"
            value={form[f.key]}
            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
          />
        ))}

        <input
          type="date"
          required
          className="post-job-input"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
        />

        <button type="submit" className="post-job-button">Post Job</button>
      </form>
    </div>
  );
}

export default PostJob;