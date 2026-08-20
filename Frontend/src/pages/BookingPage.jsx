import React, { useState, useEffect } from 'react';
import './BookingPage.css';

const BookingPage = () => {
  // Form State
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [reason, setReason] = useState('');

  // Dynamic Doctors List fetched from MongoDB API
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  // Submission Status
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 1. DYNAMICALLY LOAD DOCTORS FROM MONGOOSE REST API
  useEffect(() => {
    fetch('http://localhost:5000/api/v1/doctors')
      .then((res) => res.json())
      .then((result) => {
        if (result.success && Array.isArray(result.data)) {
          setDoctors(result.data);
        }
        setLoadingDoctors(false);
      })
      .catch((err) => {
        console.error("Error loading doctors:", err);
        setLoadingDoctors(false);
      });
  }, []);

  // 2. SUBMIT APPOINTMENT TO MONGODB VIA API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');

    try {
      // Step A: Create Patient in MongoDB
      const patientRes = await fetch('http://localhost:5000/api/v1/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: patientName,
          email: patientEmail || `${patientName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
          phone: "9876543210",
          bloodGroup: "B+",
          age: 20
        })
      });
      const patientData = await patientRes.json();
      const createdPatientId = patientData.data?._id;

      // Step B: Create Appointment in MongoDB
      const appointmentRes = await fetch('http://localhost:5000/api/v1/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: createdPatientId,
          doctorId: selectedDoctorId || doctors[0]?._id,
          date: date,
          timeSlot: timeSlot,
          status: 'pending',
          reason: reason || 'General Consultation'
        })
      });

      const appointmentData = await appointmentRes.json();

      if (appointmentData.success) {
        setMessage(`✅ Appointment successfully booked for ${patientName}!`);
        // Reset form
        setPatientName('');
        setPatientEmail('');
        setSelectedDoctorId('');
        setDate('');
        setTimeSlot('');
        setReason('');
      } else {
        setError(appointmentData.message || 'Failed to book appointment.');
      }
    } catch (err) {
      console.error("Error submitting appointment:", err);
      setError('Failed to connect to server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="booking-container">
      <h2 className="page-title">Book an Appointment</h2>
      <p className="page-subtitle">Schedule your appointment dynamically with our medical specialists.</p>

      {/* Form Submission */}
      <form onSubmit={handleSubmit} className="booking-form">
        {/* Patient Name */}
        <div className="form-group">
          <label>Patient Name *</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Enter patient full name"
            required
            className="form-control"
          />
        </div>

        {/* Patient Email */}
        <div className="form-group">
          <label>Patient Email *</label>
          <input
            type="email"
            value={patientEmail}
            onChange={(e) => setPatientEmail(e.target.value)}
            placeholder="Enter email address"
            required
            className="form-control"
          />
        </div>

        {/* Dynamic Doctor Select Options */}
        <div className="form-group">
          <label>Select Doctor *</label>
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            required
            className="form-control"
          >
            <option value="">-- {loadingDoctors ? 'Loading Doctors...' : 'Choose a Doctor'} --</option>
            {doctors.map((doc) => (
              <option key={doc._id || doc.id} value={doc._id || doc.id}>
                {doc.name} ({doc.specialisation})
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="form-group">
          <label>Appointment Date *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="form-control"
          />
        </div>

        {/* Time Slot */}
        <div className="form-group">
          <label>Time Slot *</label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
            className="form-control"
          >
            <option value="">-- Choose Time Slot --</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="10:30 AM">10:30 AM</option>
            <option value="02:00 PM">02:00 PM</option>
            <option value="04:15 PM">04:15 PM</option>
          </select>
        </div>

        {/* Reason for Visit */}
        <div className="form-group">
          <label>Reason for Visit</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Regular Cardiology Checkup"
            className="form-control"
          />
        </div>

        <button type="submit" disabled={submitting} className="submit-btn">
          {submitting ? 'Submitting...' : 'Submit Appointment'}
        </button>
      </form>

      {/* Live State Preview */}
      <div className="preview-box">
        <h4>Live Patient Name Preview:</h4>
        <p>Patient Name: <strong>{patientName ? patientName : '(Start typing above...)'}</strong></p>
      </div>

      {/* Success / Error Messages */}
      {message && (
        <div style={{ marginTop: '16px', padding: '14px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
          {message}
        </div>
      )}

      {error && (
        <div style={{ marginTop: '16px', padding: '14px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '8px', border: '1px solid #fca5a5' }}>
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default BookingPage;
