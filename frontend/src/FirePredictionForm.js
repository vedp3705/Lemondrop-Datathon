import React, { useState } from "react";

const FirePredictionForm = () => {
  const [county, setCounty] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cause, setCause] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const counties = ["County1", "County2", "County3"];
  const causes = ["Lightning", "Debris Burning", "Campfire", "Other"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      county,
      month: months.indexOf(month) + 1,
      year,
      cause,
    };

    try {
      const response = await fetch("http://localhost:5002/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        setMessage("Error: Failed to get prediction");
      }
    } catch (error) {
      setMessage("Error: Could not connect to prediction service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          'url("https://cdn.photoroom.com/v2/image-cache?path=gs://background-7ef44.appspot.com/backgrounds_v3/forest/27_forest.jpg") no-repeat center center fixed',
        backgroundSize: "cover",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "2rem",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <h1
            style={{
              color: "#1a1a1a",
              fontSize: "24px",
              marginBottom: "8px",
            }}
          >
            Fire Size Prediction
          </h1>
          <p
            style={{
              color: "#666",
              fontSize: "14px",
            }}
          >
            Enter the details below to predict potential fire size
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#4a4a4a",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              County
            </label>
            <select
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            >
              <option value="">Select a county</option>
              {counties.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#4a4a4a",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Month
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            >
              <option value="">Select a month</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#4a4a4a",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Year
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter year"
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#4a4a4a",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Cause
            </label>
            <select
              value={cause}
              onChange={(e) => setCause(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            >
              <option value="">Select cause</option>
              {causes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading || !county || !month || !year || !cause}
            style={{
              backgroundColor:
                loading || !county || !month || !year || !cause
                  ? "#ccc"
                  : "#007bff",
              color: "white",
              padding: "12px",
              borderRadius: "4px",
              border: "none",
              fontSize: "14px",
              fontWeight: "500",
              cursor:
                loading || !county || !month || !year || !cause
                  ? "not-allowed"
                  : "pointer",
              marginTop: "1rem",
            }}
          >
            {loading ? "Processing..." : "Predict Fire Size"}
          </button>
        </form>

        {message && (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              backgroundColor: "#f8f9fa",
              borderRadius: "4px",
              border: "1px solid #dee2e6",
              color: "#4a4a4a",
              fontSize: "14px",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default FirePredictionForm;
