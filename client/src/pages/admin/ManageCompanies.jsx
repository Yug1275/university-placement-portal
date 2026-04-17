import React, { useEffect, useState } from "react";
import API from "../../services/api";

function ManageCompanies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await API.get("/admin/users");
        setCompanies(data.filter((u) => u.role === "company"));
      } catch (err) {
        console.log(err);
      }
    };

    fetchCompanies();
  }, []);

  const updateStatus = async (id, approved) => {
    try {
      await API.put(`/admin/company/${id}/approve`, { approved });
      alert(`Company ${approved ? "approved" : "rejected"}`);
      setCompanies(
        companies.map((c) =>
          c._id === id ? { ...c, approved } : c
        )
      );
    } catch (err) {
      alert("Error updating status");
    }
  };

  return (
    <div className="manage-companies-container">
      <h2 className="manage-companies-heading">Manage Companies</h2>

      {companies.length === 0 && (
        <p className="manage-companies-empty">No companies found.</p>
      )}

      <div className="manage-companies-grid">
        {companies.map((company) => (
          <div key={company._id} className="manage-companies-card">
            <h3>{company.companyName || company.name}</h3>
            <p>📧 {company.email}</p>
            <p className={`manage-companies-status ${company.approved ? "manage-companies-status-approved" : "manage-companies-status-pending"}`}>
              Status: {company.approved ? "Approved ✅" : "Pending ⏳"}
            </p>

            <div className="manage-companies-btn-row">
              <button
                className="manage-companies-btn manage-companies-btn-approve"
                onClick={() => updateStatus(company._id, true)}
              >
                Approve
              </button>
              <button
                className="manage-companies-btn manage-companies-btn-reject"
                onClick={() => updateStatus(company._id, false)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageCompanies;