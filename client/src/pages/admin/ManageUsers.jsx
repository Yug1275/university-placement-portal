import React, { useEffect, useState } from "react";
import API from "../../services/api";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get("/admin/users");
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await API.delete(`/admin/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
      alert("User deleted");
    } catch (err) {
      alert("Error deleting user");
    }
  };

  const roleColor = {
    student: "manage-users-role-student",
    company: "manage-users-role-company",
    admin: "manage-users-role-admin",
  };

  return (
    <div className="manage-users-container">
      <h2 className="manage-users-heading">Manage Users</h2>

      {users.length === 0 && (
        <p className="manage-users-empty">No users found.</p>
      )}

      <div className="manage-users-grid">
        {users.map((user) => (
          <div key={user._id} className="manage-users-card">
            <h3>{user.name}</h3>
            <p>📧 {user.email}</p>
            <p className={`manage-users-role ${roleColor[user.role]}`}>
              Role: {user.role}
            </p>
            {user.role === "student" && (
              <>
                <p>🎓 CGPA: {user.cgpa || "N/A"}</p>
                <p>🔧 Skills: {user.skills?.join(", ") || "N/A"}</p>
              </>
            )}

            <button
              className="manage-users-delete-btn"
              onClick={() => deleteUser(user._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageUsers;