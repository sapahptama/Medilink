import React from "react";
import "./citasUsuarios.css";

export default function CitasAgendadas() {
  const citas = [
    {
      id: 1,
      medico: "Dr. Juan Pérez",
      especialidad: "Cardiólogo",
      fecha: "2025-08-28",
      hora: "10:30 AM",
      estado: "Confirmada",
      imagen: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      medico: "Dra. María Gómez",
      especialidad: "Pediatra",
      fecha: "2025-09-01",
      hora: "02:00 PM",
      estado: "Pendiente",
      imagen: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      medico: "Dr. Carlos Rodríguez",
      especialidad: "Dermatólogo",
      fecha: "2025-09-05",
      hora: "09:00 AM",
      estado: "Cancelada",
      imagen: "https://randomuser.me/api/portraits/men/65.jpg",
    },
  ];

  const handleChatClick = (medico) => {
    // Aquí puedes integrar tu función existente para abrir el chat
    console.log(`Iniciar chat con ${medico}`);
    // tuFuncionDeChat(medico);
  };

  return (
    <div className="contenedor">
      <h1 className="titulo">Mis Citas Agendadas</h1>
      <div className="grid">
        {citas.map((cita) => (
          <div key={cita.id} className="card">
            <img src={cita.imagen} alt={cita.medico} className="imagen" />
            <h3 className="nombre">{cita.medico}</h3>
            <p className="especialidad">{cita.especialidad}</p>
            <p><span>Fecha:</span>{cita.fecha}</p>
            <p><span>Hora:</span> {cita.hora}</p>
            <p
              className={`estado ${
                cita.estado === "Confirmada"
                  ? "verde"
                  : cita.estado === "Pendiente"
                  ? "naranja"
                  : "rojo"
              }`}
            >
              {cita.estado}
            </p>
            <button 
              className="boton-chat"
              onClick={() => handleChatClick(cita.medico)}
            >
              Chatear con el Doctor
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}