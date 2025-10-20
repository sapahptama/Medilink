import React, { useState } from "react";
import "./historialmedico.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

export default function Historialmedico() {
  const [pacientes] = useState([
    {
      id: 1,
      nombre: "Ana",
      apellidos: "Gómez",
      genero: "Femenino",
      fechaNacimiento: "1997-06-15",
      edad: 28,
      direccion: "Cra 10 # 23-45, Medellín",
      telefono: "3001234567",
      contactoEmergencia: "Laura Gómez - 3012233445",
      ocupacion: "Ingeniera de Sistemas",
      enfermedad: "Asma",
      medicamentosActuales: ["Salbutamol (inhalador)", "Montelukast 10mg/día"],
      antecedentesFamiliares: "Madre hipertensa, padre diabético",
      alergias: "Penicilina",
      evolucionClinica: "Ha mejorado con el uso regular del inhalador.",
      historial: [
        { fecha: "2025-01-10", descripcion: "Consulta general" },
        { fecha: "2025-03-05", descripcion: "Vacuna antitetánica" }
      ]
    },
    {
      id: 2,
      nombre: "Luis",
      apellidos: "Martínez",
      genero: "Masculino",
      fechaNacimiento: "1990-11-22",
      edad: 26,
      direccion: "Cl 45 # 12-67, cali",
      telefono: "3109876543",
      contactoEmergencia: "Carlos Martínez - 3125566778",
      ocupacion: "Profesor",
      enfermedad: "Hipertensión",
      medicamentosActuales: ["Losartán 50mg cada 12h"],
      antecedentesFamiliares: "Abuelo con enfermedad cardíaca",
      alergias: "Ninguna conocida",
      evolucionClinica: "Presión arterial controlada con medicación.",
      historial: [{ fecha: "2025-02-20", descripcion: "Examen de sangre" }]
    },
     {
      id: 3,
      nombre: "matias ",
      apellidos: "londoño",
      genero: "Masculino",
      fechaNacimiento: "2007-11-12",
      edad: 17,
      direccion: "Cl 39 # 12-67, medellín",
      telefono: "3109876543",
      contactoEmergencia: "luisa perea - 3135505778",
      ocupacion: "empresario",
      enfermedad: "Hipertensión",
      medicamentosActuales: ["Losartán 50mg cada 12h"],
      antecedentesFamiliares: "mama con enfermedad cardíaca",
      alergias: "miel",
      evolucionClinica: "Presión arterial controlada con medicación.",
      historial: [{ fecha: "2025-04-22", descripcion: "Examen de sangre" }]
    },
     {
      id: 4,
      nombre: "taliana",
      apellidos: "mosquera",
      genero: "Femenino",
      fechaNacimiento: "1990-11-22",
      edad: 35,
      direccion: "Cl 44 # 16-64, Bogotá",
      telefono: "3109876543",
      contactoEmergencia: "Carlos Martínez - 3125669778",
      ocupacion: "bombero",
      enfermedad: "diabetes",
      medicamentosActuales: ["Losartán 50mg cada 12h"],
      antecedentesFamiliares: "Abuelo con enfermedad cardíaca",
      alergias: "Ninguna conocida",
      evolucionClinica: "nivel regular  de glucosa.",
      historial: [{ fecha: "2025-07-27", descripcion: "Examen de sangre" }]
    },
      {
      id: 5,
      nombre: "yeison",
      apellidos: "mosquera",
      genero: "masculino",
      fechaNacimiento: "1990-11-22",
      edad: 21,
      direccion: "Cl 44 # 16-64, Bogotá",
      telefono: "3109876543",
      contactoEmergencia: "Carlos Martínez - 3125669778",
      ocupacion: "profesor",
      enfermedad: "lupus",
      medicamentosActuales: ["Losartán 50mg cada 12h"],
      antecedentesFamiliares: "mamá con enfermedad cardíaca",
      alergias: "Ninguna conocida",
      evolucionClinica: "en tratamiento.",
      historial: [{ fecha: "2025-07-27", descripcion: "Examen de sangre" }]
    }
    
  ]);

  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const pacientesFiltrados = pacientes.filter((paciente) =>
    `${paciente.nombre} ${paciente.apellidos}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="historial-container">
      
      {!pacienteSeleccionado && (
        <div className="listado-pacientes">
          <h1 className="titulo">Pacientes</h1>
          <div className="buscador">
            <FiSearch className="icono-busqueda" />
            <input
              type="text"
              placeholder="Buscar paciente..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="buscador-input"
            />
          </div>

          {pacientesFiltrados.length > 0 ? (
            pacientesFiltrados.map((paciente) => (
              <div
                key={paciente.id}
                className="card-paciente"
                onClick={() => setPacienteSeleccionado(paciente)}
              >
                <h3>{paciente.nombre} {paciente.apellidos}</h3>
                <p><strong>Edad:</strong> {paciente.edad}</p>
                <p><strong>Tel:</strong> {paciente.telefono}</p>
              </div>
            ))
          ) : (
            <p className="mensaje-seleccion">No se encontraron pacientes.</p>
          )}
        </div>
      )}

      
      <div className="detalle-paciente">
        {pacienteSeleccionado ? (
          <>
            <div className="volver" onClick={() => setPacienteSeleccionado(null)}>
              <IoIosArrowRoundBack size={28} /> Volver a lista
            </div>

            <div className="detalle-historial-container">
              <h2>{pacienteSeleccionado.nombre} {pacienteSeleccionado.apellidos}</h2>

              <div className="info-section">
                <h3>Datos Personales</h3>
                <p><strong>Género:</strong> {pacienteSeleccionado.genero}</p>
                <p><strong>Fecha de nacimiento:</strong> {pacienteSeleccionado.fechaNacimiento}</p>
                <p><strong>Edad:</strong> {pacienteSeleccionado.edad}</p>
                <p><strong>Dirección:</strong> {pacienteSeleccionado.direccion}</p>
                <p><strong>Teléfono:</strong> {pacienteSeleccionado.telefono}</p>
                <p><strong>Contacto de emergencia:</strong> {pacienteSeleccionado.contactoEmergencia}</p>
                <p><strong>Ocupación:</strong> {pacienteSeleccionado.ocupacion}</p>
              </div>

              <div className="info-section">
                <h3>Información Médica</h3>
                <p><strong>Enfermedad:</strong> {pacienteSeleccionado.enfermedad}</p>
                <p><strong>Medicamentos actuales:</strong></p>
                <ul>
                  {pacienteSeleccionado.medicamentosActuales.map((med, i) => (
                    <li key={i}>{med}</li>
                  ))}
                </ul>
                <p><strong>Antecedentes familiares:</strong> {pacienteSeleccionado.antecedentesFamiliares}</p>
                <p><strong>Alergias:</strong> {pacienteSeleccionado.alergias}</p>
                <p><strong>Evolución clínica:</strong> {pacienteSeleccionado.evolucionClinica}</p>
              </div>

              <div className="info-section">
                <h3>Historial Médico</h3>
                <ul>
                  {pacienteSeleccionado.historial.length > 0 ? (
                    pacienteSeleccionado.historial.map((registro, i) => (
                      <li key={i}>
                        <strong>{registro.fecha}:</strong> {registro.descripcion}
                      </li>
                    ))
                  ) : (
                    <li>No hay registros disponibles.</li>
                  )}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <p className="mensaje-seleccion">Seleccione un paciente para ver su historial.</p>
        )}
      </div>
    </div>
  );
}


