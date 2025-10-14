import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBell, FaEnvelope, FaCalendarAlt, FaTimes } from "react-icons/fa";
import "./notificaciones.css";
import Menu from "../../components/menu/menu.jsx";

export default function Notificaciones() {
  const navigate = useNavigate();

  // Lista inicial de notificaciones
  const [notificaciones, setNotificaciones] = useState([
    { id: 1, icon: <FaCalendarAlt className="icon" />, text: "Tienes una cita mañana a las 10:00 AM con la Dra. López" },
    { id: 2, icon: <FaBell className="icon" />, text: "Tu contraseña fue actualizada exitosamente" },
    { id: 3, icon: <FaEnvelope className="icon" />, text: "Nuevo mensaje del Dr. Martínez en el chat" },
  ]);

  // Función para eliminar notificación
  const eliminarNotificacion = (id) => {
    setNotificaciones(notificaciones.filter((n) => n.id !== id));
  };

  return (
    <div className="notif-container">
      {/* HEADER */}
      <header className="notif-header">
        <button className="back-btn" onClick={() => navigate("/inicio")}>
          <FaArrowLeft />
        </button>
        <h2>Notificaciones</h2>
      </header>

      {/* CONTENIDO */}
      <main className="notif-main">
        {notificaciones.length > 0 ? (
          notificaciones.map((notif) => (
            <div key={notif.id} className="notif-item">
              {notif.icon}
              <p>{notif.text}</p>
              <button className="delete-btn" onClick={() => eliminarNotificacion(notif.id)}>
                <FaTimes />
              </button>
            </div>
          ))
        ) : (
          <p className="no-notif">No tienes notificaciones nuevas 🎉</p>
        )}
      </main>

     <Menu/>    </div>
  );
}
