import React from "react";
import { useNavigate } from "react-router-dom";
import "./SeleccionRegistro.css"; 

function SeleccionRegistro() {
  const navigate = useNavigate();

  // Navegar según el tipo de registro
  const handleRegistro = (tipo) => {
    if (tipo === "doctor") {
      // Aquí después pondrás tu código de registro de médico
      navigate("/registro-medico"); 
    } else {
      // Aquí después pondrás tu código de registro de paciente
      navigate("/registro-paciente"); 
    }
  };

  return (
    <div className="seleccion-container">
      {/* Título de bienvenida */}
      <h1>¡Bienvenido a MediLink!</h1>
      <p className="subtitulo">Selecciona el tipo de usuario para continuar</p>

      {/* Botones de selección */}
      <div className="botones-container">
        <button 
          className="btn-seleccion doctor" 
          onClick={() => handleRegistro("doctor")}
        >
          Soy Doctor
        </button>
        <button 
          className="btn-seleccion paciente" 
          onClick={() => handleRegistro("paciente")}
        >
          Soy Paciente
        </button>
      </div>
    </div>
  );
}

export default SeleccionRegistro;
