import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© 2026 Developed by Yug</p>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#111",
    color: "#fff",
    textAlign: "center",
    padding: "12px",
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
};

export default Footer;