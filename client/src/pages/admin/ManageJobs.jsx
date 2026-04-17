import React, { useEffect, useState } from "react";
import API from "../../services/api";

function ManageJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await API.get("/admin/jobs");
        setJobs(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await API.delete(`/admin/jobs/${id}`);
      setJobs(jobs.filter((j) => j._id !== id));
      alert("Job deleted");
    } catch (err) {
      alert("Error deleting job");
    }
  };

  return (
    <div className="manage-jobs-container">
      <h2 className="manage-jobs-heading">Manage Jobs</h2>

      {jobs.length === 0 && (
        <p className="manage-jobs-empty">No jobs found.</p>
      )}

      <div className="manage-jobs-grid">
        {jobs.map((job) => (
          <div key={job._id} className="manage-jobs-card">
            <h3>{job.title}</h3>
            <p>🏢 {job.company?.companyName || job.company?.name || "N/A"}</p>
            <p>📍 {job.location}</p>
            <p>💰 {job.salary}</p>
            <p className="manage-jobs-description">
              {job.description}
            </p>

            <button
              className="manage-jobs-delete-btn"
              onClick={() => deleteJob(job._id)}
            >
              Delete Job
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageJobs;