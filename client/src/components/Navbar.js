import React from "react";

function Navbar() {
  return (
    <div style={styles.nav}>
      <h2>Placement Portal</h2>
    </div>
  );
}

const styles = {
  nav: {
    padding: "10px 20px",
    background: "#333",
    color: "#fff",
  },
};

export default Navbar;