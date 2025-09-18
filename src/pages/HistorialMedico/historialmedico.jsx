import React, { useState } from "react";
import "./historialmedico.css";

export default function Historialmedico() {
  const [pacientes] = useState([
    {
      id: 1,
      nombre: "Ana",
      apellidos: "Gómez",
      edad: 28,
      telefono: "3001234567",
      historial: [
        { fecha: "2025-01-10", descripcion: "Consulta general" },
        { fecha: "2025-03-05", descripcion: "Vacuna antitetánica" }
      ]
    },
    {
      id: 2,
      nombre: "Luis",
      apellidos: "Martínez",
      edad: 35,
      telefono: "3109876543",
      historial: [
        { fecha: "2025-02-20", descripcion: "Examen de sangre" }
      ]
    }
  ]);

  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  return (
    <div className="historial-container">
      {/* Lista de pacientes */}
      <div className="listado-pacientes">
        <h1>Pacientes</h1>
        {pacientes.map((paciente) => (
          <div
            key={paciente.id}
            className={`card-paciente ${pacienteSeleccionado?.id === paciente.id ? "activo" : ""}`}
            onClick={() => setPacienteSeleccionado(paciente)}
          >
            <p><strong>{paciente.nombre} {paciente.apellidos}</strong></p>
            <p>Edad: {paciente.edad}</p>
            <p>{paciente.telefono}</p>
          </div>
        ))}
      </div>

      {/* Detalle del historial */}
      <div className="detalle-paciente">
        {pacienteSeleccionado ? (
          <div className="detalle-historial-container">
            <h2>{pacienteSeleccionado.nombre} {pacienteSeleccionado.apellidos}</h2>
            <p><strong>Edad:</strong> {pacienteSeleccionado.edad}</p>
            <p><strong>Teléfono:</strong> {pacienteSeleccionado.telefono}</p>
            <h3>Historial Médico</h3>
            <ul>
              {pacienteSeleccionado.historial.length > 0 ? (
                pacienteSeleccionado.historial.map((registro, index) => (
                  <li key={index}>
                    <strong>{registro.fecha}:</strong> {registro.descripcion}
                  </li>
                ))
              ) : (
                <li>No hay registros disponibles.</li>
              )}
            </ul>
          </div>
        ) : (
          <p className="mensaje-seleccion">Seleccione un paciente para ver su historial.</p>
        )}
      </div>
    </div>
  );
}
