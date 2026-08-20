import React from 'react';
import './AppointmentCard.css';

// AppointmentCard component accepting required props:
// patientName, doctorName, date, timeSlot, status
const AppointmentCard = ({ patientName, doctorName, date, timeSlot, status }) => {
  // Conditional class name based on the status prop
  const statusClass = status ? status.toLowerCase() : '';

  return (
    <div className="appointment-card">
      <h3>Patient: {patientName}</h3>
      <p><strong>Doctor:</strong> {doctorName}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Time Slot:</strong> {timeSlot}</p>
      <p>
        <strong>Status: </strong>
        <span className={`status-badge ${statusClass}`}>
          {status}
        </span>
      </p>
    </div>
  );
};

export default AppointmentCard;
