import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import pinImage from './images/pin.png';

// ResizeMap Component to fix rendering issues when the container size changes
const ResizeMap = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
};

// Map click handler
const MapClickHandler = ({ setCoordinates }) => {
  useMapEvents({
    click(e) {
      setCoordinates([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const FirePredictionForm = () => {
  const [county, setCounty] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cause, setCause] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);

  const counties = ["County1", "County2", "County3"];
  const causes = ["Lightning", "Debris Burning", "Campfire", "Other"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { 
      county, 
      month: months.indexOf(month) + 1, 
      year, 
      cause,
      coordinates
    };
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        setMessage('Error: Failed to get prediction');
      }
    } catch (error) {
      setMessage('Error: Could not connect to prediction service');
    } finally {
      setLoading(false);
    }
  };

  const customIcon = new L.Icon({
    iconUrl: pinImage, 
    iconSize: [48, 48],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'url("https://cdn.photoroom.com/v2/image-cache?path=gs://background-7ef44.appspot.com/backgrounds_v3/forest/27_forest.jpg") no-repeat center center fixed',
      backgroundSize: 'cover',
      padding: '2rem'
    }}>
      {/* Outer container: add alignItems: 'stretch' so columns match height */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        gap: '1rem',
        width: mapVisible ? '1016px' : '500px', // 500px (form) + gap + 500px (map) when map is visible
        transition: 'width 0.3s ease-in-out'
      }}>
        {/* Form Section */}
        <div style={{
          width: '500px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          padding: '2rem'
        }}>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h1 style={{ color: '#1a1a1a', fontSize: '24px', marginBottom: '8px' }}>
              Fire Size Prediction
            </h1>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Enter the details below to predict potential fire size
            </p>
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
                {counties.map(c => <option key={c} value={c}>{c}</option>)}
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
                {months.map(m => <option key={m} value={m}>{m}</option>)}
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
                  fontSize: '14px',
                  boxSizing: 'border-box', // ensures the width stays consistent
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
                {causes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            {coordinates && (
              <div style={{ color: '#4a4a4a', fontSize: '14px', fontWeight: '500' }}>
                <p>Selected Coordinates: {coordinates[0].toFixed(4)}, {coordinates[1].toFixed(4)}</p>
              </div>
            )}
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
          <button
            type="button"
            onClick={() => setMapVisible(true)}
            style={{
              padding: '8px 12px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Show Map
          </button>
        </div>
        {/* Map Section */}
        {mapVisible && (
          <div style={{ width: '500px' }}>
            <MapContainer 
              center={[37.7749, -122.4194]} 
              zoom={5} 
              style={{ width: '100%', height: '100%', borderRadius: '8px' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <ResizeMap />
              <MapClickHandler setCoordinates={setCoordinates} />
              {coordinates && (
                <Marker position={coordinates} icon={customIcon}>
                  <Popup>
                    Selected: {coordinates[0].toFixed(4)}, {coordinates[1].toFixed(4)}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirePredictionForm;
