import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaExclamationTriangle,
  FaCamera,
} from "react-icons/fa";
import "./perfil.css";

export default function Perfil() {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState({
    nombre: "Juan Pérez",
    correo: "juanperez@email.com",
    telefono: "3001234567",
    edad: "28",
    alergias: "Ninguna",
    contactoEmergencia: "María Pérez - 3012345678",
    foto: "https://randomuser.me/api/portraits/men/32.jpg", // foto de perfil real
  });

  const [editando, setEditando] = useState(false);

  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPerfil({ ...perfil, foto: reader.result });
    reader.readAsDataURL(file);
  };

  const handleGuardar = () => {
    setEditando(false);
    // aquí podrías llamar a tu API para persistir cambios
    alert("Perfil actualizado ✅");
  };

  const handleLogout = () => {
    // lógica de logout
    alert("Sesión cerrada");
    navigate("/"); // ir a login
  };

  return (
    <div className="perfil-root">
      {/* Flecha siempre a /inicio */}
      <button className="perfil-back" onClick={() => navigate("/inicio-paciente")} aria-label="Volver a inicio">
        <FaArrowLeft /> <span>Inicio</span>
      </button>

      <h2 className="perfil-title">Mi Perfil</h2>

      {/* Foto */}
      <div className="perfil-top">
        <div className="perfil-foto">
          <img src={perfil.foto} alt="Foto de perfil" />
        </div>

        {editando ? (
          <label className="perfil-cambiar-foto">
            <FaCamera /> Cambiar foto
            <input type="file" accept="image/*" onChange={handleFotoChange} hidden />
          </label>
        ) : null}
      </div>

      {/* Card con datos */}
      <div className="perfil-card">
        <div className="perfil-row">
          <FaUser className="perfil-icon" />
          {editando ? (
            <input name="nombre" value={perfil.nombre} onChange={handleChange} />
          ) : (
            <span className="perfil-value">{perfil.nombre}</span>
          )}
        </div>

        <div className="perfil-row">
          <FaEnvelope className="perfil-icon" />
          {editando ? (
            <input name="correo" value={perfil.correo} onChange={handleChange} />
          ) : (
            <span className="perfil-value">{perfil.correo}</span>
          )}
        </div>

        <div className="perfil-row">
          <FaPhone className="perfil-icon" />
          {editando ? (
            <input name="telefono" value={perfil.telefono} onChange={handleChange} />
          ) : (
            <span className="perfil-value">{perfil.telefono}</span>
          )}
        </div>

        <div className="perfil-row">
          <FaBirthdayCake className="perfil-icon" />
          {editando ? (
            <input name="edad" type="number" value={perfil.edad} onChange={handleChange} />
          ) : (
            <span className="perfil-value">{perfil.edad} años</span>
          )}
        </div>

        <div className="perfil-row">
          <FaExclamationTriangle className="perfil-icon" />
          {editando ? (
            <input name="alergias" value={perfil.alergias} onChange={handleChange} />
          ) : (
            <span className="perfil-value">Alergias: {perfil.alergias}</span>
          )}
        </div>

        <div className="perfil-row">
          <FaPhone className="perfil-icon" />
          {editando ? (
            <input
              name="contactoEmergencia"
              value={perfil.contactoEmergencia}
              onChange={handleChange}
            />
          ) : (
            <span className="perfil-value">Contacto: {perfil.contactoEmergencia}</span>
          )}
        </div>
      </div>

      {/* Acciones */}
      <div className="perfil-actions">
        {editando ? (
          <button className="btn guardar" onClick={handleGuardar}>
            Guardar cambios
          </button>
        ) : (
          <button className="btn editar" onClick={() => setEditando(true)}>
            Editar perfil
          </button>
        )}

        <button className="btn logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
