import React from "react";
import "./perfil.css";

const PerfilPaciente = () => {
  const paciente = {
    nombre: "Juan Pérez",
    edad: 34,
    eps: "Sura",
    correo: "juan.perez@email.com",
    telefono: "+57 300 123 4567",
    direccion: "Calle 123 #45-67, Bogotá",
    tipoSangre: "O+",
    alergias: "Ninguna",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  };

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <img className="perfil-foto" src={paciente.foto} alt="Foto de perfil" />
        <h2 className="perfil-titulo">{paciente.nombre}</h2>
        
        <div className="perfil-datos">
          <p>
            <span>Edad:</span>
            <span>{paciente.edad} años</span>
          </p>
          <p>
            <span>EPS:</span>
            <span>{paciente.eps}</span>
          </p>
          <p>
            <span>Correo:</span>
            <span>{paciente.correo}</span>
          </p>
          <p>
            <span>Teléfono:</span>
            <span>{paciente.telefono}</span>
          </p>
          <p>
            <span>Dirección:</span>
            <span>{paciente.direccion}</span>
          </p>
          <p>
            <span>Tipo de Sangre:</span>
            <span>{paciente.tipoSangre}</span>
          </p>
          <p>
            <span>Alergias:</span>
            <span>{paciente.alergias}</span>
          </p>
        </div>
        
        <button className="boton-editar">Editar Perfil</button>
      </div>
    </div>
  );
};

export default PerfilPaciente;