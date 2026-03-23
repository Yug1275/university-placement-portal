import React, { useEffect, useState } from "react";
import API from "../../services/api";

function Applications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      const { data } = await API.get("/applications/my");
      setApps(data);
    };
    fetchApps();
  }, []);

  return (
    <div className="applications-container">
      <h2 className="applications-heading">My Applications</h2>

      <div className="applications-grid">
        {apps.map((app) => (
          <div key={app._id} className="applications-card">
            <h3>{app.job.title}</h3>
            <p><strong>Status:</strong> {app.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applications;