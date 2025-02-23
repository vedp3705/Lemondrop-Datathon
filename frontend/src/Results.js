import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./Results.css";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    mitigationPlan = "No data available.",
    predicted_fire_size_class = "N/A",
    predicted_confidence = 0,
  } = location.state || {};

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.log("🔥 Received state:", JSON.stringify(location.state, null, 2));
    console.log("📊 Fire Size Class:", predicted_fire_size_class);
    console.log("📈 Confidence:", predicted_confidence);
  }, [location.state, predicted_fire_size_class, predicted_confidence]);

  const handleCopy = () => {
    navigator.clipboard.writeText(mitigationPlan);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format values for display
  const displayFireClass = predicted_fire_size_class;
  const displayConfidence = (predicted_confidence * 100).toFixed(2);

  // Determine the acreage description using a proper conditional (if/else or ternary)
  let acreageDescription = "";
  if (displayFireClass === "A") {
    acreageDescription = "greater than 0 but less than or equal to 0.25 acres";
  } else if (displayFireClass === "B") {
    acreageDescription = "between 0.26 and 9.9 acres";
  } else if (displayFireClass === "C") {
    acreageDescription = "between 10.0 and 99.9 acres";
  } else if (displayFireClass === "D") {
    acreageDescription = "between 100 and 299 acres";
  } else if (displayFireClass === "E") {
    acreageDescription = "between 300 and 999 acres";
  } else if (displayFireClass === "F") {
    acreageDescription = "between 1000 and 4999 acres";
  } else if (displayFireClass === "G") {
    acreageDescription = "5000 or more acres";
  }

  // Explanation for fire class sizes with context
  const fireClassContext = `Based on the prediction, **Class ${displayFireClass}** indicates a wildfire that, at its expected maximum extent, would cover ${acreageDescription}. The confidence level of **${displayConfidence}%** suggests that there is a high probability that this prediction is accurate.
  
  `;

  return (
    <div className="container">
      <div className="contentWrapper">
        {/* Main Box containing all details */}
        <div 
          className="contentBox" 
          style={{
            backgroundColor: "rgba(240, 240, 240, 0.9)", // light, slightly transparent background
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
          }}
        >
          {/* Header Section with Fire Class and Confidence */}
          <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "22px", color: "#333" }}>
              Expected Max Fire Classification: <span>{displayFireClass}</span>
            </h2>
            <p style={{ margin: 0, fontSize: "18px", color: "#555" }}>
              Confidence: <strong>{displayConfidence}%</strong>
            </p>
          </div>

          {/* Context / Explanation Section */}
          <div style={{ fontSize: "14px", lineHeight: "1.6", color: "#444", marginTop: "1rem" }}>
            <ReactMarkdown>{fireClassContext}</ReactMarkdown>
          </div>

          {/* Mitigation Plan Section */}
          <div style={{ marginTop: "2rem" }}>
            <h1 style={{ fontSize: "20px", color: "#333", marginBottom: "0.5rem" }}>
                Recommended Optimal Fire Mitigation Plan 
            </h1>
            <div style={{ fontSize: "14px", lineHeight: "1.6", color: "#444" }}>
              <ReactMarkdown>{mitigationPlan}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Button Container */}
        <div className="buttonContainer" style={{ marginTop: "1.5rem" }}>
          <button className="button" onClick={handleCopy}>
            {copied ? "✅ Copied!" : "📋 Copy Plan"}
          </button>
          <button className="backButton" onClick={() => navigate("/")}>
            ⬅️ Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
