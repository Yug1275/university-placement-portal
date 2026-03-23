import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© 2026 Developed by Yug & Meet</p>
    </footer>
  );
}

const styles = {
  footer: {
    width: "100%",
    background: "#111",
    color: "#fff",
    textAlign: "center",
    padding: "12px",
    position: "fixed",
    bottom: 0,
    left: 0,   
  },
};

export default Footer;