import React, { useState } from "react";
import "./RecuperarContrasena.css";

function RecuperarContrasena() {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (correo) {
      setMensaje("Si el correo está registrado, recibirás instrucciones en unos minutos.");
      setCorreo("");
    }
  };

  return (
    <div className="recuperar-container">
      <div className="logo">
        <img src="logo-medilink.jpeg" alt="MediLink Logo" />
      </div>

      <h2>Recuperar contraseña</h2>

      <form className="recuperar-form" onSubmit={manejarEnvio}>
        <label htmlFor="correo">Ingresa tu correo electrónico</label>
        <input
          type="email"
          id="correo"
          name="correo"
          placeholder="correo@ejemplo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <button type="submit">Enviar instrucciones</button>
      </form>

      {mensaje && <p className="mensaje-exito">{mensaje}</p>}

      <p className="volver-inicio">
        <a href="/">Volver al inicio de sesión</a>
      </p>
    </div>
  );
}

export default RecuperarContrasena;

