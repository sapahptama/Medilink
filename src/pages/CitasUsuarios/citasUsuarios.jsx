import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaClock, FaUserMd, FaHospital } from "react-icons/fa";
import "./citasUsuarios.css";

function CitasUsuarios() {
  const navigate = useNavigate();

  const citas = [
    {
      id: 1,
      fecha: "2025-10-10",
      hora: "10:00 AM",
      medico: "Dra. Ana Gómez",
      especialidad: "Cardiología",
      clinica: "Clínica Medellín",
    },
    {
      id: 2,
      fecha: "2025-10-15",
      hora: "2:30 PM",
      medico: "Dr. Juan Pérez",
      especialidad: "Dermatología",
      clinica: "Clínica Las Vegas",
    },
  ];

  return (
    <div className="citasusuarios-container">
      {/* Flecha para volver */}
      <div className="back-button" onClick={() => navigate("/inicio-paciente")}>
        <FaArrowLeft size={18} /> <span>Inicio</span>
      </div>

      <h2>Mis Citas Agendadas</h2>

      <div className="citas-grid">
        {citas.length > 0 ? (
          citas.map((cita) => (
            <div key={cita.id} className="cita-card">
              <div className="cita-row">
                <FaCalendarAlt className="icon" />
                <span><strong>Fecha:</strong> {cita.fecha}</span>
              </div>
              <div className="cita-row">
                <FaClock className="icon" />
                <span><strong>Hora:</strong> {cita.hora}</span>
              </div>
              <div className="cita-row">
                <FaUserMd className="icon" />
                <span><strong>Médico:</strong> {cita.medico} ({cita.especialidad})</span>
              </div>
              <div className="cita-row">
                <FaHospital className="icon" />
                <span><strong>Clínica:</strong> {cita.clinica}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="sin-citas">No tienes citas agendadas aún.</p>
        )}
      </div>
    </div>
  );
}

export default CitasUsuarios;
