import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mitigationPlan = location.state?.mitigationPlan || "No data available.";

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <h1 style={styles.header}>Fire Mitigation Plan</h1>
        <div style={styles.contentBox}>
          <p style={styles.content}>{mitigationPlan}</p>
        </div>
        <button style={styles.button} onClick={() => navigate("/")}>
          ⬅️ Go Back
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100vh",
    background: "linear-gradient(to right, #141e30, #243b55)",
    padding: "2rem",
    overflow: "auto",
  },
  contentWrapper: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    maxWidth: "900px",
    width: "100%",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: "1rem",
  },
  contentBox: {
    flexGrow: 1,
    overflowY: "auto",
    maxHeight: "60vh",
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  content: {
    fontSize: "16px",
    color: "#555",
    textAlign: "left",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
  },
  button: {
    marginTop: "1rem",
    padding: "12px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
    alignSelf: "center",
  },
};

export default Results;
