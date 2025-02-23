import React, { useState } from "react";
import "./FirePredictionForm.css"; // Import the CSS file for styling

function FirePredictionForm() {
  const [county, setCounty] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cause, setCause] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { county, month, year, cause };
    console.log("Form submitted:", payload);

    try {
      const response = await fetch("http://localhost:5002/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        setMessage(data.message); // Expect backend to return { message: "success" }
      } else {
        console.error("API error:", response.statusText);
        setMessage("API Error");
      }
    } catch (error) {
      console.error("Error calling prediction API:", error);
      setMessage("Error calling API");
    }
  };

  return (
    <div className="fire-form-container">
      <div className="form-wrapper">
        <h1>Wildfire Size Prediction</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>County:</label>
            <select value={county} onChange={(e) => setCounty(e.target.value)}>
              <option value="">Select a county</option>
              <option value="County1">County1</option>
              <option value="County2">County2</option>
              <option value="County3">County3</option>
              {/* Add additional county options as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>Month:</label>
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="">Select a month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <div className="form-group">
            <label>Year:</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter year"
            />
          </div>
          <div className="form-group">
            <label>Cause:</label>
            <select value={cause} onChange={(e) => setCause(e.target.value)}>
              <option value="">Select cause</option>
              <option value="Lightning">Lightning</option>
              <option value="Debris Burning">Debris Burning</option>
              <option value="Campfire">Campfire</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Predict Fire Size
          </button>
        </form>
        {message && (
          <div className="response">
            <h2>Response:</h2>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FirePredictionForm;
