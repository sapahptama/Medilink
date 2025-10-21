import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBell, FaLock, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import "./Ajustes.css";

export default function Ajustes() {
  const navigate = useNavigate();

  return (
    <div className="ajustes-container">
      {/* HEADER */}
      <header className="ajustes-header">
        <button className="back-btn" onClick={() => navigate("/inicio-paciente")}>
          <FaArrowLeft />
        </button>
        <h2>Ajustes</h2>
      </header>

      {/* OPCIONES */}
      <main className="ajustes-main">
        <button className="ajuste-item" onClick={() => alert("Notificaciones")}>
          <FaBell className="icon" /> Notificaciones
        </button>

        <button className="ajuste-item" onClick={() => alert("Seguridad y Contraseña")}>
          <FaLock className="icon" /> Seguridad y Contraseña
        </button>

        <button className="ajuste-item" onClick={() => alert("Perfil")}>
          <FaUserCog className="icon" /> Configuración de Perfil
        </button>

        <button className="ajuste-item logout" onClick={() => navigate("/login")}>
          <FaSignOutAlt className="icon" /> Cerrar Sesión
        </button>
      </main>
    </div>
  );
}
