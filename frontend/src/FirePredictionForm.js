// // src/components/FirePredictionForm.js
// import React, { useState } from 'react';

// function FirePredictionForm() {
//   // State variables for each input field
//   const [county, setCounty] = useState('');
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');
//   const [cause, setCause] = useState('');
//   const [message, setMessage] = useState('');

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Build the payload from form data
//     const payload = { county, month, year, cause };
//     console.log('Form submitted:', payload);

//     // Call your backend API (adjust URL as necessary)
//     try {
//       const response = await fetch('http://localhost:5000/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setMessage(data.message); // expect backend to return { message: "success" }
//       } else {
//         console.error('API error:', response.statusText);
//         setMessage('API Error');
//       }
//     } catch (error) {
//       console.error('Error calling prediction API:', error);
//       setMessage('Error calling API');
//     }
//   };

//   return (
//     <div style={{ margin: '2rem' }}>
//       <h1>Fire Size Prediction</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>County: </label>
//           <select value={county} onChange={(e) => setCounty(e.target.value)}>
//             <option value="">Select a county</option>
//             <option value="County1">County1</option>
//             <option value="County2">County2</option>
//             <option value="County3">County3</option>
//           </select>
//         </div>
//         <div>
//           <label>Month: </label>
//           <select value={month} onChange={(e) => setMonth(e.target.value)}>
//             <option value="">Select a month</option>
//             <option value="1">January</option>
//             <option value="2">February</option>
//             <option value="3">March</option>
//             <option value="4">April</option>
//             <option value="5">May</option>
//             <option value="6">June</option>
//             <option value="7">July</option>
//             <option value="8">August</option>
//             <option value="9">September</option>
//             <option value="10">October</option>
//             <option value="11">November</option>
//             <option value="12">December</option>
//           </select>
//         </div>
//         <div>
//           <label>Year: </label>
//           <input
//             type="number"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             placeholder="Enter year"
//           />
//         </div>
//         <div>
//           <label>Cause: </label>
//           <select value={cause} onChange={(e) => setCause(e.target.value)}>
//             <option value="">Select cause</option>
//             <option value="Lightning">Lightning</option>
//             <option value="Debris Burning">Debris Burning</option>
//             <option value="Campfire">Campfire</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>
//         <div style={{ marginTop: '1rem' }}>
//           <button type="submit">Predict Fire Size</button>
//         </div>
//       </form>
//       {message && (
//         <div style={{ marginTop: '1rem' }}>
//           <h2>Response:</h2>
//           <p>{message}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FirePredictionForm;






// import React, { useState } from "react";
// import "./FirePredictionForm.css"; // Ensure you have your CSS file

// function FirePredictionForm() {
//   const [county, setCounty] = useState("");
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");
//   const [cause, setCause] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = { county, month, year, cause };
//     console.log("Form submitted:", payload);

//     try {
//       const response = await fetch("http://localhost:5002/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setMessage(data.message); // Backend returns { message: "success" } (for example)
//       } else {
//         console.error("API error:", response.statusText);
//         setMessage("API Error");
//       }
//     } catch (error) {
//       console.error("Error calling prediction API:", error);
//       setMessage("Error calling API");
//     }
//   };

//   return (
//     <div className="fire-form-container">
//       <div className="form-wrapper">
//         <h1>Wildfire Size Prediction</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>County:</label>
//             <select value={county} onChange={(e) => setCounty(e.target.value)}>
//               <option value="">Select a county</option>
//               <option value="County1">County1</option>
//               <option value="County2">County2</option>
//               <option value="County3">County3</option>
//               {/* Add additional county options as needed */}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Month:</label>
//             <select value={month} onChange={(e) => setMonth(e.target.value)}>
//               <option value="">Select a month</option>
//               <option value="1">January</option>
//               <option value="2">February</option>
//               <option value="3">March</option>
//               <option value="4">April</option>
//               <option value="5">May</option>
//               <option value="6">June</option>
//               <option value="7">July</option>
//               <option value="8">August</option>
//               <option value="9">September</option>
//               <option value="10">October</option>
//               <option value="11">November</option>
//               <option value="12">December</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Year:</label>
//             <input
//               type="number"
//               value={year}
//               onChange={(e) => setYear(e.target.value)}
//               placeholder="Enter year"
//             />
//           </div>
//           <div className="form-group">
//             <label>Cause:</label>
//             <select value={cause} onChange={(e) => setCause(e.target.value)}>
//               <option value="">Select cause</option>
//               <option value="Lightning">Lightning</option>
//               <option value="Debris Burning">Debris Burning</option>
//               <option value="Campfire">Campfire</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <button type="submit" className="submit-button">
//             Predict Fire Size
//           </button>
//         </form>
//         {message && (
//           <div className="response">
//             <h2>Response:</h2>
//             <p>{message}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default FirePredictionForm;








































import React, { useState } from "react";
import "./FirePredictionForm.css"; // Ensure you have your CSS file

function FirePredictionForm() {
  const [county, setCounty] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cause, setCause] = useState("");
  const [message, setMessage] = useState("");

  // State for County Geolocation
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [geoError, setGeoError] = useState("");

  // Function to fetch county coordinates
  const fetchCountyCoordinates = async (selectedCounty) => {
    setGeoError("");
    setLatitude(null);
    setLongitude(null);

    try {
      const response = await fetch(`http://localhost:5001/geocode?county=${encodeURIComponent(selectedCounty)}`);
      const data = await response.json();

      if (response.ok) {
        setLatitude(data.latitude);
        setLongitude(data.longitude);
      } else {
        setGeoError("County not found.");
      }
    } catch (error) {
      setGeoError("Error fetching coordinates.");
    }
  };

  const handleCountyChange = (e) => {
    const selectedCounty = e.target.value;
    setCounty(selectedCounty);

    if (selectedCounty.trim()) {
      fetchCountyCoordinates(selectedCounty);
    }
  };

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
        setMessage(data.message);
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
            <input
              type="text"
              value={county}
              onChange={handleCountyChange}
              placeholder="Enter county name"
            />
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

      {/* Display latitude & longitude on the side */}
      <div className="coordinate-display">
        <h3>County Coordinates</h3>
        {latitude && longitude ? (
          <>
            <p><strong>Latitude:</strong> {latitude}</p>
            <p><strong>Longitude:</strong> {longitude}</p>
          </>
        ) : geoError ? (
          <p style={{ color: "red" }}>Error: {geoError}</p>
        ) : (
          <p>Enter a county to get coordinates.</p>
        )}
      </div>
    </div>
  );
}

export default FirePredictionForm;
