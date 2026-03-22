import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Welcome {user?.name}</h2>
      <p>Role: {user?.role}</p>
    </div>
  );
}

export default Dashboard;