import React, { useState, useContext, useEffect } from "react";
import {
  Bell,
  Calendar,
  ClipboardList,
  Stethoscope,
  FileText,
  User,
  Home,
  Phone,
  Mail,
  ChevronRight,
  Heart,
  Clock,
  Activity,
} from "lucide-react";
import "./InicioMedico.css";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import ProximaCita from "../../components/ProximaCita/ProximaCita";

function InicioMedico() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [isMobile, setIsMobile] = useState(false);
  const { usuario } = useContext(UserContext);
  const navigate = useNavigate();

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigateTo = {
    inicio: () => setActiveTab("inicio"),
    pacientes: () => navigate("/mis-pacientes"),
    citas: () => navigate("/mis-citas"),
    perfil: () => navigate("/perfil"),
    horarios: () => navigate("/mis-horarios"),
  };

  return (
    <div className="inicio-medico-container">
      {/* HEADER */}
      <header className="inicio-medico-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-icon">
              <Stethoscope className="icon-stetho" />
            </div>
            <h1 className="logo-text">MediLink</h1>
          </div>

          <div className="header-right">
            <button
              onClick={navigateTo.perfil}
              className="header-profile-btn"
              aria-label="Perfil"
            >
              <div className="profile-avatar">
                <User className="profile-icon" />
              </div>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* SALUDO */}
        <section className="welcome-section">
          <h2 className="welcome-title">
            ¡Hola, Dr. {usuario?.nombre || "Médico"}! 👋
          </h2>
        </section>

        {/* ACCIONES RÁPIDAS - RESPONSIVE */}
        <section className="quick-actions">
          <button onClick={navigateTo.pacientes} className="action-card">
            <div className="action-icon teal">
              <Activity className="icon" />
            </div>
            <h3 className="action-title">Mis Pacientes</h3>
            <p className="action-subtitle">Ver historial y fichas</p>
          </button>

          {/* Mostrar "Citas" solo en dispositivos grandes */}
          {!isMobile && (
            <button onClick={navigateTo.citas} className="action-card">
              <div className="action-icon blue">
                <Calendar className="icon" />
              </div>
              <h3 className="action-title">Mis Citas</h3>
              <p className="action-subtitle">Hoy y próximas</p>
            </button>
          )}

          <button onClick={navigateTo.horarios} className="action-card">
            <div className="action-icon purple">
              <Clock className="icon" />
            </div>
            <h3 className="action-title">Mis Horarios</h3>
            <p className="action-subtitle">Gestiona tu disponibilidad</p>
          </button>
        </section>

        {/* CONTENIDO PRINCIPAL */}
        <div className="content-grid">
          <div className="left-column">
            <ProximaCita />
            
            {/* PACIENTES DESTACADOS */}
            <div className="favorites-card">
              <h3 className="card-title">
                <Heart className="title-icon red" />
                Pacientes recientes
              </h3>

              <div className="favorites-list">
                <button className="favorite-item">
                  <div className="favorite-avatar blue">
                    <User className="icon" />
                  </div>
                  <div className="favorite-info">
                    <h4 className="favorite-name">Carlos Gómez</h4>
                    <p className="favorite-description">Chequeo general</p>
                  </div>
                  <ChevronRight className="chevron-icon" />
                </button>

                <button className="favorite-item">
                  <div className="favorite-avatar purple">
                    <User className="icon" />
                  </div>
                  <div className="favorite-info">
                    <h4 className="favorite-name">Lucía Pérez</h4>
                    <p className="favorite-description">Cardiología</p>
                  </div>
                  <ChevronRight className="chevron-icon" />
                </button>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="right-column">
            {/* RECORDATORIOS */}
            <div className="reminders-card">
              <h3 className="card-title">
                <Clock className="title-icon amber" />
                Recordatorios
              </h3>

              <div className="reminders-list">
                <div className="reminder-item blue">
                  <p className="reminder-title">Actualizar historial</p>
                  <p className="reminder-text">Paciente: Juan Ramírez</p>
                </div>
                <div className="reminder-item green">
                  <p className="reminder-title">Cita en 30 minutos</p>
                  <p className="reminder-text">Paciente: Laura Ríos</p>
                </div>
              </div>
            </div>

            {/* CONTACTO */}
            <div className="contact-card">
              <h3 className="card-title">Contacto del Soporte</h3>
              <div className="contact-list">
                <a href="tel:+573001234567" className="contact-item">
                  <div className="contact-icon teal">
                    <Phone className="icon" />
                  </div>
                  <div>
                    <p className="contact-label">Llamar</p>
                    <p className="contact-value">Soporte técnico</p>
                  </div>
                </a>

                <a href="mailto:soporte@medilink.com" className="contact-item">
                  <div className="contact-icon blue">
                    <Mail className="icon" />
                  </div>
                  <div>
                    <p className="contact-label">Correo</p>
                    <p className="contact-value">Enviar mensaje</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* NAVEGACIÓN INFERIOR - SOLO EN MÓVIL */}
      {isMobile && (
        <nav className="bottom-navigation">
          <button
            onClick={navigateTo.inicio}
            className={`nav-item ${activeTab === "inicio" ? "active" : ""}`}
          >
            <Home className="nav-icon" />
            <span className="nav-label">Inicio</span>
          </button>

          <button
            onClick={navigateTo.citas}
            className={`nav-item ${activeTab === "citas" ? "active" : ""}`}
          >
            <Calendar className="nav-icon" />
            <span className="nav-label">Citas</span>
          </button>

          <button
            onClick={navigateTo.perfil}
            className={`nav-item ${activeTab === "perfil" ? "active" : ""}`}
          >
            <User className="nav-icon" />
            <span className="nav-label">Perfil</span>
          </button>
        </nav>
      )}
    </div>
  );
}

export default InicioMedico;