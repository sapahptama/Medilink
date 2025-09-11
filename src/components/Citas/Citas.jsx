import React from "react";
import "./citas.css";

const citasEjemplo = [
  {
    id: 1,
    paciente: "Laura Martínez",
    fecha: "2025-07-18",
    hora: "10:00 AM",
    motivo: "Control general"
  },
  {
    id: 2,
    paciente: "Carlos Gómez",
    fecha: "2025-07-18",
    hora: "11:30 AM",
    motivo: "Dolor de cabeza persistente"
  },
  {
    id: 3,
    paciente: "Diana Torres",
    fecha: "2025-07-19",
    hora: "09:00 AM",
    motivo: "control geeneral"
  }
];

export default function Citas() {
  return (
    <div className="citas-container">
      <h2>Mis Citas Agendadas</h2>
      <div className="citas-lista">
        {citasEjemplo.map((cita) => (
          <div key={cita.id} className="cita-card">
            <h3>{cita.paciente}</h3>
            <p><strong>Fecha:</strong> {cita.fecha}</p>
            <p><strong>Hora:</strong> {cita.hora}</p>
            <p><strong>Motivo:</strong> {cita.motivo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

