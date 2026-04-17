import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const { data } = await API.get("/jobs/my");
      setJobs(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await API.delete(`/jobs/${id}`);
      alert("Job deleted");
      fetchJobs();
    } catch (err) {
      alert("Error deleting job");
    }
  };

  return (
    <div className="my-jobs-container">
      <h2 className="my-jobs-heading">My Posted Jobs</h2>

      {jobs.length === 0 && (
        <p className="my-jobs-empty">No jobs posted yet.</p>
      )}

      <div className="my-jobs-grid">
        {jobs.map((job) => (
          <div key={job._id} className="my-jobs-card">
            <h3>{job.title}</h3>
            <p>{job.location} | {job.salary}</p>
            <p className="my-jobs-description">{job.description}</p>

            <div className="my-jobs-btn-row">
              <button
                className="my-jobs-btn-view"
                onClick={() => navigate(`/applicants/${job._id}`)}
              >
                View Applicants
              </button>
              <button
                className="my-jobs-btn-delete"
                onClick={() => deleteJob(job._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyJobs;