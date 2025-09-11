import { Link, useNavigate } from 'react-router-dom'; // <-- agregamos useNavigate
import React, { useState } from "react";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // <-- inicializamos navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    // Aquí podrías validar el login con una API

    // Redirige a /inicio
    navigate("/inicio");
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src="logo-medilink.jpeg" alt="MediLink Logo" />
      </div>

      <h2>Iniciar sesión</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="olvide-password">
          <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
        </div>

        <button type="submit">Entrar</button>

        <p className="registro-link">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
