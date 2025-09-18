import React, { useState } from "react";
import VistaMedico from "../VistaDetalladaMedico/vistamedico.jsx";
import "./vistaprincipalmedico.css";

export default function PrincipalMedico() {
  const [medicos, setMedicos] = useState([]);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);

  const agregarMedico = (nuevoMedico) => {
    setMedicos([...medicos, { id: Date.now(), ...nuevoMedico }]);
  };

  return (
    <div className="principal-medico-container">
      <h1 className="titulo-principal">Listado de Médicos</h1>

      <div className="listado-medicos">
        {medicos.length === 0 && (
          <p className="mensaje-vacio">No hay médicos registrados.</p>
        )}
        {medicos.map((medico) => (
          <div
            key={medico.id}
            className="card-medico"
            onClick={() => setMedicoSeleccionado(medico)}
          >
            <h3>{medico.nombre} {medico.apellidos}</h3>
            <p className="especialidad">{medico.especialidad}</p>
            <p>{medico.telefono}</p>
          </div>
        ))}
      </div>

      {medicoSeleccionado && (
        <div className="detalle-medico-modal">
          <div className="modal-contenido">
            <button
              className="cerrar-btn"
              onClick={() => setMedicoSeleccionado(null)}
            >
              &times;
            </button>
            <VistaMedico medico={medicoSeleccionado} />
          </div>
        </div>
      )}
    </div>
  );
}

