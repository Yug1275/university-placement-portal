import React, { useEffect, useState } from "react";
import API from "../../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState({});

  // Filters
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, appsRes] = await Promise.all([
          API.get("/jobs"),
          API.get("/applications/my")
        ]);
        
        setJobs(jobsRes.data);
        
        // Extract applied job IDs
        const appliedIds = new Set(appsRes.data.map(app => 
          typeof app.job === "object" ? app.job._id : app.job // Fallback in case job is populated or not
        ));
        setAppliedJobIds(appliedIds);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const applyJob = async (jobId) => {
    setApplying(prev => ({ ...prev, [jobId]: true }));
    try {
      await API.post("/applications", { jobId });
      setAppliedJobIds(prev => {
        const next = new Set(prev);
        next.add(jobId);
        return next;
      });
    } catch (err) {
      alert(err?.response?.data?.message || "Error applying to job");
    } finally {
      setApplying(prev => ({ ...prev, [jobId]: false }));
    }
  };

  // Derive unique locations and salaries dynamically
  const uniqueLocations = [...new Set(jobs.map(j => j.location).filter(Boolean))];
  const uniqueSalaries = [...new Set(jobs.map(j => j.salary).filter(Boolean))];

  // Filtering Logic
  const filteredJobs = jobs.filter(job => {
    const matchTitle = job.title?.toLowerCase().includes(search.toLowerCase());
    const matchLocation = locationFilter ? job.location === locationFilter : true;
    const matchSalary = salaryFilter ? job.salary === salaryFilter : true;
    return matchTitle && matchLocation && matchSalary;
  });

  return (
    <div className="student-jobs-page">
      <div className="jobs-header">
        <h1 className="page-title">Explore <span className="gradient-text">Opportunities</span></h1>
        <p className="page-subtitle">Find and apply for roles that match your skills.</p>
      </div>

      <div className="jobs-filter-bar glass-card">
        <input 
          type="text" 
          placeholder="Search by job title..." 
          className="job-search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="job-filter-select"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          {uniqueLocations.map((loc, i) => <option key={i} value={loc}>{loc}</option>)}
        </select>
        <select 
          className="job-filter-select"
          value={salaryFilter}
          onChange={(e) => setSalaryFilter(e.target.value)}
        >
          <option value="">All Salaries</option>
          {uniqueSalaries.map((sal, i) => <option key={i} value={sal}>{sal}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="loading-state">Loading jobs...</div>
      ) : (
        <div className="professional-jobs-grid">
          {filteredJobs.length > 0 ? filteredJobs.map(job => {
            const hasApplied = appliedJobIds.has(job._id);
            const isApplying = applying[job._id];
            
            return (
              <div key={job._id} className="pro-job-card glass-card">
                <div className="pro-job-header">
                  <div>
                    <h3 className="pro-job-title">{job.title}</h3>
                    <p className="pro-job-company">{job.company?.name || "Premium Company"}</p>
                  </div>
                  <div className="pro-job-deadline">
                    <span className="deadline-badge">⏳ {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Active'}</span>
                  </div>
                </div>

                <div className="pro-job-details">
                  <span>📍 {job.location || 'Remote'}</span>
                  <span>💰 {job.salary || 'Competitive'}</span>
                </div>

                <div className="pro-job-desc">
                  {job.description || "Exciting opportunity to join our rapidly growing team."}
                </div>

                <div className="pro-job-skills">
                  {(job.skills?.length ? job.skills : ['Communication', 'Teamwork']).slice(0, 3).map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                  {(job.skills?.length > 3) && <span className="skill-tag">+{job.skills.length - 3}</span>}
                </div>

                <div className="pro-job-footer">
                  <button 
                    className={`btn-apply ${hasApplied ? 'applied' : ''}`}
                    onClick={() => applyJob(job._id)}
                    disabled={hasApplied || isApplying}
                  >
                    {isApplying ? 'Applying...' : hasApplied ? '✓ Already Applied' : 'Apply Now'}
                  </button>
                </div>
              </div>
            );
          }) : (
            <div className="no-jobs">No jobs match your criteria.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Jobs;