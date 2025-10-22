import React, { useState, useContext } from "react";
import {
  Bell,
  Calendar,
  ClipboardList,
  Stethoscope,
  FileText,
  User,
  MessageCircle,
  Activity,
  Clock,
  Heart,
  ChevronRight,
  MapPin,
  Home,
  Phone,
  Mail,
} from "lucide-react";
import "./InicioMedico.css";
import { UserContext } from "../../context/UserContext";

function InicioMedico() {
  const [activeTab, setActiveTab] = useState("inicio");
  const { usuario } = useContext(UserContext);

  const navigateTo = {
    inicio: () => setActiveTab("inicio"),
    pacientes: () => setActiveTab("pacientes"),
    citas: () => setActiveTab("citas"),
    historial: () => setActiveTab("historial"),
    mensajes: () => setActiveTab("mensajes"),
    notificaciones: () => setActiveTab("notificaciones"),
    perfil: () => setActiveTab("perfil"),
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
              onClick={navigateTo.notificaciones}
              className="header-icon-btn"
              aria-label="Notificaciones"
            >
              <Bell className="header-icon" />
              <span className="notification-badge"></span>
            </button>

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
          <p className="welcome-subtitle">
            Aquí tienes tu panel de control médico
          </p>
        </section>

        {/* ACCIONES RÁPIDAS */}
        <section className="quick-actions">
          <button onClick={navigateTo.pacientes} className="action-card">
            <div className="action-icon teal">
              <Activity className="icon" />
            </div>
            <h3 className="action-title">Mis Pacientes</h3>
            <p className="action-subtitle">Ver historial y fichas</p>
          </button>

          <button onClick={navigateTo.citas} className="action-card">
            <div className="action-icon blue">
              <Calendar className="icon" />
            </div>
            <h3 className="action-title">Mis Citas</h3>
            <p className="action-subtitle">Hoy y próximas</p>
          </button>

          <button onClick={navigateTo.historial} className="action-card">
            <div className="action-icon purple">
              <FileText className="icon" />
            </div>
            <h3 className="action-title">Historial Clínico</h3>
            <p className="action-subtitle">Pacientes atendidos</p>
          </button>

          <button onClick={navigateTo.mensajes} className="action-card">
            <div className="action-icon amber">
              <MessageCircle className="icon" />
            </div>
            <h3 className="action-title">Mensajes</h3>
            <p className="action-subtitle">Chats y consultas</p>
          </button>
        </section>

        {/* CONTENIDO PRINCIPAL */}
        <div className="content-grid">
          <div className="left-column">
            {/* PRÓXIMAS CITAS */}
            <div className="next-appointment-card">
              <div className="appointment-header">
                <div className="appointment-info">
                  <p className="appointment-label">Próxima consulta</p>
                  <h3 className="appointment-time">Lunes, 9:00 AM</h3>
                  <p className="appointment-doctor">
                    <User className="inline-icon" /> Paciente: Ana Torres
                  </p>
                  <p className="appointment-location">
                    <MapPin className="inline-icon" /> Consultorio 302
                  </p>
                </div>
                <div className="appointment-icon-wrapper">
                  <Calendar className="appointment-icon" />
                </div>
              </div>
              <div className="appointment-actions">
                <button className="btn-primary">Ver detalles</button>
                <button className="btn-secondary">Reprogramar</button>
              </div>
            </div>

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

      {/* NAVEGACIÓN INFERIOR */}
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
          onClick={navigateTo.mensajes}
          className={`nav-item ${activeTab === "mensajes" ? "active" : ""}`}
        >
          <MessageCircle className="nav-icon" />
          <span className="nav-label">Mensajes</span>
          <span className="nav-badge">2</span>
        </button>

        <button
          onClick={navigateTo.perfil}
          className={`nav-item ${activeTab === "perfil" ? "active" : ""}`}
        >
          <User className="nav-icon" />
          <span className="nav-label">Perfil</span>
        </button>
      </nav>
    </div>
  );
}

export default InicioMedico;
