import React, { useEffect, useState } from "react";
import API from "../../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await API.get("/jobs");
      setJobs(data);
    };
    fetchJobs();
  }, []);

  const applyJob = async (jobId) => {
    try {
      await API.post("/applications", { jobId });
      alert("Applied successfully");
    } catch (err) {
      alert(err?.response?.data?.message || "Error");
    }
  };

  return (
    <div className="jobs-container">
      <h2 className="jobs-heading">Available Jobs</h2>

      <div className="jobs-grid">
        {jobs.map((job) => (
          <div key={job._id} className="jobs-card">
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>

            <button
              className="jobs-button"
              onClick={() => applyJob(job._id)}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;