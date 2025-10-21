// Importamos React 
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para movernos entre pantallas
import "./Splash.css"; // Importamos los estilos

function Splash() {
  const navigate = useNavigate(); // Hook que nos ayuda a navegar entre rutas

  useEffect(() => {
    // ⏳ Este efecto se ejecuta cuando carga la pantalla
    // Espera 3 segundos y después nos lleva a la ruta "/inicio"
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    // 🔄 Limpieza del temporizador si el componente se desmonta
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      {/* 🟢 Logo */}
      <img src="/logo-medilink.jpeg" alt="MediLink Logo" className="splash-logo" />

      {/* 🔵 Nombre de la app */}
      <h1 className="splash-title">MediLink</h1>
      {/* 🟣 Nuestro lema */}
      <p className="splash-tagline">"Conectando Pacientes y salud :)."</p>
    </div>
    
  );
}

export default Splash;
