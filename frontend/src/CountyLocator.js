// import React, { useState } from 'react';

// const CountyLocator = () => {
//   const [county, setCounty] = useState('');
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setResult(null);
//     try {
//       const response = await fetch(`http://localhost:5000/geocode?county=${encodeURIComponent(county)}`);
//       const data = await response.json();
//       if (response.ok) {
//         setResult(data);
//       } else {
//         setError(data.error || 'An error occurred');
//       }
//     } catch (err) {
//       setError('Network error');
//     }
//   };

//   return (
//     <div>
//       <h2>County Locator</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={county}
//           onChange={(e) => setCounty(e.target.value)}
//           placeholder="Enter county name"
//         />
//         <button type="submit">Locate</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//       {result && (
//         <div>
//           <p><strong>County:</strong> {result.county}</p>
//           <p><strong>Latitude:</strong> {result.latitude}</p>
//           <p><strong>Longitude:</strong> {result.longitude}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CountyLocator;







import React, { useState } from "react";

function CountyLocator() {
  const [countyInput, setCountyInput] = useState("");
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState("");

  const handleLocate = async (e) => {
    e.preventDefault();
    setError("");
    setCoords(null);

    try {


      // Call the Flask backend running on port 5000
    //   const response = await fetch(
    //     `http://localhost:5000/geocode?county=${encodeURIComponent(countyInput)}`
    //   );
        const response = await fetch(`http://localhost:5001/geocode?county=${encodeURIComponent(countyInput)}`);
        const data = await response.json();
        if (response.ok) {
            setCoords(data);
        } else {
            setError(data.error || "Error fetching coordinates");
        }
        } catch (err) {
            setError("Network error");
        }
    };

  return (
    <div>
      <h2>County Locator</h2>
      <form onSubmit={handleLocate}>
        <input
          type="text"
          value={countyInput}
          onChange={(e) => setCountyInput(e.target.value)}
          placeholder="Enter county name"
        />
        <button type="submit">Get Coordinates</button>
      </form>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {coords && (
        <div>
          <p><strong>County:</strong> {coords.county}</p>
          <p><strong>Latitude:</strong> {coords.latitude}</p>
          <p><strong>Longitude:</strong> {coords.longitude}</p>
        </div>
      )}
    </div>
  );
}

export default CountyLocator;
