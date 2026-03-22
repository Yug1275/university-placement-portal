import React from "react";

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <p>Dashboard</p>
      <p>Jobs</p>
      <p>Profile</p>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "200px",
    height: "100vh",
    background: "#222",
    color: "#fff",
    padding: "20px",
  },
};

export default Sidebar;