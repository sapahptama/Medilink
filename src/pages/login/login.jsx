import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext } from "react";
import "./login.css";
import { UserContext } from "../../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUsuario } = useContext(UserContext);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://servidor-medilink.vercel.app/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo: email, contrasena: password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Error al iniciar sesión");
      return;
    }

    // ✅ Guardar usuario globalmente
    setUsuario(data.usuario);

    // ✅ Redirigir según el rol devuelto por el servidor
    if (data.usuario.rol === "medico") {
      navigate("/inicio-medico");
    } else if (data.usuario.rol === "paciente") {
      navigate("/inicio-paciente");
    } else {
      navigate("/inicio");
    }
  } catch (err) {
    console.error(err);
    alert("No se pudo conectar con el servidor");
  }
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
          ¿No tienes cuenta? <Link to="/SeleccionRegistro">Regístrate</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
