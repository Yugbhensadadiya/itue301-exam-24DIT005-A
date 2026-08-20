import React, { useState, useEffect } from 'react';
import AppointmentCard from '../components/AppointmentCard';

const HomePage = () => {
  // State for appointments, loading status, and error handling
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch appointments from MongoDB REST API on component load
  useEffect(() => {
    fetch('http://localhost:5000/api/v1/appointments')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch appointments');
        }
        return res.json();
      })
      .then((result) => {
        console.log("Fetched Appointments:", result);
        if (result.success && Array.isArray(result.data)) {
          setAppointments(result.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setError("Could not load appointments from backend server.");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '650px', margin: '0 auto' }}>
      <h2 className="page-title">Hospital Appointments Overview</h2>
      <p className="page-subtitle">Welcome to the Hospital Management System. Here are current live appointments:</p>

      {/* Loading state */}
      {loading && <p style={{ color: '#0056b3' }}>Loading appointments...</p>}

      {/* Error state */}
      {error && <p style={{ color: '#c62828' }}>{error}</p>}

      {/* No appointments message */}
      {!loading && !error && appointments.length === 0 && (
        <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#64748b' }}>No appointments booked yet. Click <strong>Booking</strong> in the navigation bar to create one!</p>
        </div>
      )}

      {/* Dynamic rendering of AppointmentCards fetched from MongoDB */}
      {!loading && !error && appointments.map((item) => (
        <AppointmentCard
          key={item._id || item.id}
          patientName={item.patientId?.name || item.patientName || "Guest Patient"}
          doctorName={item.doctorId?.name || item.doctorName || "Specialist Doctor"}
          date={item.date}
          timeSlot={item.timeSlot}
          status={item.status}
        />
      ))}
    </div>
  );
};

export default HomePage;
