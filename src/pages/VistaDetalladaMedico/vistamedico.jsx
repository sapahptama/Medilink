import React from "react";
import "./vistamedico.css";

export default function VistaMedico() {

  const medico = {
    nombre: "Juan",
    apellidos: "Pérez",
    especialidad: "Cardiología",
    telefono: "3001234567",
    email: "juan.perez@email.com"
  };

  return (
    <div className="vista-medico-container">
      {/* Header */}
      <div className="header-medico">
        <div className="info-medico">
          <h2 className="nombre-medico">{medico.nombre} {medico.apellidos}</h2>
          <p className="especialidad-medico">{medico.especialidad}</p>
        </div>
      </div>

      {/* Body */}
      <div className="body-medico">
        <p><strong>Teléfono:</strong> {medico.telefono}</p>
        <p><strong>Email:</strong> {medico.email}</p>
      </div>
    </div>
  );
}


