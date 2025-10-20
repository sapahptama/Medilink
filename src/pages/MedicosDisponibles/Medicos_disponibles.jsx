import React from 'react';
import './Medicos_disponibles.css';

const doctors = [
  {
    id: 1,
    name: 'Dra. Laura Martínez',
    specialty: 'Medicina General',
    location: 'Sede Norte',
    availability: 'Lunes a Viernes - 8:00am a 4:00pm',
  },
  {
    id: 2,
    name: 'Dr. Matias Arroyo',
    specialty: 'Cardiología',
    location: 'Sede Central',
    availability: 'Martes y Jueves - 9:00am a 2:00pm',
  },
  {
    id: 3,
    name: 'Dra. Carolina Vélez',
    specialty: 'Pediatría',
    location: 'Sede Sur',
    availability: 'Lunes, Miércoles y Viernes - 10:00am a 5:00pm',
  },
];

function AvailableDoctors() {
  return (
    <div className="available-doctors-container">
      <h2>Médicos Disponibles</h2>
      <div className="doctor-list">
        {doctors.map((doc) => (
          <div className="doctor-card" key={doc.id}>
            <h3>{doc.name}</h3>
            <p><strong>Especialidad:</strong> {doc.specialty}</p>
            <p><strong>Ubicación:</strong> {doc.location}</p>
            <p><strong>Horario:</strong> {doc.availability}</p>
            <button className="btn-appoint">Agendar Cita</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableDoctors;
