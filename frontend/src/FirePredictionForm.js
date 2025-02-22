// src/components/FirePredictionForm.js
import React, { useState } from 'react';

function FirePredictionForm() {
  // State variables for each input field
  const [county, setCounty] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cause, setCause] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build the payload from form data
    const payload = { county, month, year, cause };
    console.log('Form submitted:', payload);

    // Call your backend API (adjust URL as necessary)
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message); // expect backend to return { message: "success" }
      } else {
        console.error('API error:', response.statusText);
        setMessage('API Error');
      }
    } catch (error) {
      console.error('Error calling prediction API:', error);
      setMessage('Error calling API');
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h1>Fire Size Prediction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>County: </label>
          <select value={county} onChange={(e) => setCounty(e.target.value)}>
            <option value="">Select a county</option>
            <option value="County1">County1</option>
            <option value="County2">County2</option>
            <option value="County3">County3</option>
          </select>
        </div>
        <div>
          <label>Month: </label>
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
        <div>
          <label>Year: </label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Enter year"
          />
        </div>
        <div>
          <label>Cause: </label>
          <select value={cause} onChange={(e) => setCause(e.target.value)}>
            <option value="">Select cause</option>
            <option value="Lightning">Lightning</option>
            <option value="Debris Burning">Debris Burning</option>
            <option value="Campfire">Campfire</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <button type="submit">Predict Fire Size</button>
        </div>
      </form>
      {message && (
        <div style={{ marginTop: '1rem' }}>
          <h2>Response:</h2>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default FirePredictionForm;
