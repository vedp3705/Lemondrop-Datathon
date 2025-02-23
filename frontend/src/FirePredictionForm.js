import React, { useState } from 'react';

function FirePredictionForm() {
  const [county, setCounty] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cause, setCause] = useState("");
  const [message, setMessage] = useState("");

const FirePredictionForm = () => {
  const [county, setCounty] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cause, setCause] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const counties = ["County1", "County2", "County3"];
  const causes = ["Lightning", "Debris Burning", "Campfire", "Other"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { county, month, year, cause };
    console.log("Form submitted:", payload);
    setLoading(true);
    
    const payload = { 
      county, 
      month: months.indexOf(month) + 1, 
      year, 
      cause 
    };

    try {
      const response = await fetch("http://localhost:5002/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const data = await response.json();
        setMessage(data.message); // Expect backend to return { message: "success" }
        setMessage(data.message);
      } else {
        console.error("API error:", response.statusText);
        setMessage("API Error");
        setMessage('Error: Failed to get prediction');
      }
    } catch (error) {
      console.error("Error calling prediction API:", error);
      setMessage("Error calling API");
      setMessage('Error: Could not connect to prediction service');
    } finally {
      setLoading(false);
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
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        width: '100%',
        maxWidth: '500px'
      }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ 
            color: '#1a1a1a',
            fontSize: '24px',
            marginBottom: '8px'
          }}>Fire Size Prediction</h1>
          <p style={{ 
            color: '#666',
            fontSize: '14px'
          }}>Enter the details below to predict potential fire size</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#4a4a4a',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              County
            </label>
            <select
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            >
              <option value="">Select a county</option>
              {counties.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#4a4a4a',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Month
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            >
              <option value="">Select a month</option>
              {months.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#4a4a4a',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Year
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter year"
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#4a4a4a',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Cause
            </label>
            <select
              value={cause}
              onChange={(e) => setCause(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            >
              <option value="">Select cause</option>
              {causes.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading || !county || !month || !year || !cause}
            style={{
              backgroundColor: loading || !county || !month || !year || !cause ? '#ccc' : '#007bff',
              color: 'white',
              padding: '12px',
              borderRadius: '4px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '500',
              cursor: loading || !county || !month || !year || !cause ? 'not-allowed' : 'pointer',
              marginTop: '1rem'
            }}
          >
            {loading ? "Processing..." : "Predict Fire Size"}
          </button>
        </form>

        {message && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            border: '1px solid #dee2e6',
            color: '#4a4a4a',
            fontSize: '14px'
          }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default FirePredictionForm;