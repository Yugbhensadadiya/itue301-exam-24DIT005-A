import React, { useState, useEffect } from 'react';

const DoctorsPage = () => {
  // 1. STATE MANAGEMENT: Three explicit states as required for Task 4
  const [data, setData] = useState([]);         // Stores doctor list fetched from Express API
  const [loading, setLoading] = useState(true);  // Tracks loading status during API fetch
  const [error, setError] = useState("");        // Stores error message if API request fails

  // 2. API CALL USING useEffect: Runs automatically when DoctorsPage component mounts
  useEffect(() => {
    // Debugging log for testing
    console.log("Fetching doctors...");

    // Set loading = true before starting API call
    setLoading(true);

    // Call Express REST API created in Task 3
    fetch('http://localhost:5000/api/v1/doctors')
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP Error: " + response.status);
        }
        return response.json();
      })
      .then((result) => {
        // Log API response for debugging
        console.log("API Response:", result);

        // Save response data into state
        if (result.success && Array.isArray(result.data)) {
          setData(result.data);
        } else {
          setData([]);
        }

        // Set loading = false after successful fetch
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        // Store error message and set loading = false if request fails
        setError("Failed to load doctors.");
        setLoading(false);
      });
  }, []); // Empty dependency array ensures request runs only once on page load

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Our Medical Specialists</h2>

      {/* 3. LOADING STATE UI */}
      {loading && <p style={{ fontSize: '16px', color: '#0056b3' }}>Loading doctors...</p>}

      {/* 4. ERROR STATE UI */}
      {error && <p style={{ fontSize: '16px', color: '#c62828', fontWeight: 'bold' }}>{error}</p>}

      {/* 5. SUCCESS UI: Dynamically rendering doctor cards from API response using map() */}
      {!loading && !error && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
          {data.map((doctor) => (
            <div 
              key={doctor.id} 
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <h3 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>Doctor Name: {doctor.name}</h3>
              <p style={{ margin: '4px 0', color: '#555' }}>
                <strong>Specialisation:</strong> {doctor.specialisation}
              </p>
              <p style={{ margin: '4px 0', color: '#555' }}>
                <strong>Availability: </strong>
                <span style={{ 
                  fontWeight: 'bold', 
                  color: doctor.available ? '#2e7d32' : '#c62828' 
                }}>
                  {doctor.available ? 'Available' : 'Not Available'}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
