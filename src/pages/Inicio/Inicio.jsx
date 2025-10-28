import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  User,
  Activity,
  FileText,
  Clock,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Heart,
  Pill,
  Stethoscope,
  ClipboardList,
  Home,
} from "lucide-react";
import "./Inicio.css";
import { useNavigate } from "react-router-dom";
import ProximaCita from "../../components/ProximaCita/ProximaCita";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function Inicio() {
  const { usuario } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("inicio");
  const [isMobile, setIsMobile] = useState(false);
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

  // 🔗 FUNCIONES DE NAVEGACIÓN
  const navigateTo = {
    buscar: () => {
      console.log("Navegar a búsqueda avanzada");
    },
    perfil: () => {
      console.log("Navegar a perfil completo");
      navigate("/perfil");
    },
    agendarCita: () => {
      navigate("/seleccionar-medico");
    },
    misCitas: () => {
      console.log("Navegar a mis citas");
      navigate("/mis-citas");
    },
    historialMedico: () => {
      if (!usuario?.id_paciente) {
        console.warn("No se encontró el ID del paciente.");
        return;
      }
      navigate(`/historial-medico?id=${usuario.id_paciente}`);
    },
    resultados: () => {
      console.log("Navegar a resultados de laboratorio");
    },
    clinica: (clinicaId) => {
      console.log(`Navegar a clínica: ${clinicaId}`);
    },
    doctor: (doctorId) => {
      console.log(`Navegar a doctor: ${doctorId}`);
    },
    verDetalleCita: (citaId) => {
      console.log(`Ver detalle de cita: ${citaId}`);
    },
    inicio: () => {
      setActiveTab("inicio");
    }
  };

  return (
    <div className="inicio-perfil-container">
      {/* HEADER MODERNO */}
      <header className="inicio-perfil-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-icon">
              <Heart className="icon-heart" />
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

      <div className="main-content">
        {/* SALUDO Y BARRA DE BÚSQUEDA */}
        <div className="welcome-section">
          <h2 className="welcome-title">¡Hola, María! 👋</h2>
          <p className="welcome-subtitle">¿Cómo podemos ayudarte hoy?</p>

          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar clínicas, doctores, especialidades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button onClick={navigateTo.buscar} className="search-button">
              Buscar
            </button>
          </div>
        </div>

        {/* ACCIONES RÁPIDAS - RESPONSIVE */}
        <div className="quick-actions">
          <button onClick={navigateTo.agendarCita} className="action-card">
            <div className="action-icon teal">
              <Calendar className="icon" />
            </div>
            <h3 className="action-title">Agendar Cita</h3>
            <p className="action-subtitle">Nueva consulta</p>
          </button>

          {/* Mostrar "Mis Citas" solo en dispositivos grandes */}
          {!isMobile && (
            <button onClick={navigateTo.misCitas} className="action-card">
              <div className="action-icon blue">
                <ClipboardList className="icon" />
              </div>
              <h3 className="action-title">Mis Citas</h3>
              <p className="action-subtitle">Ver programadas</p>
            </button>
          )}

          <button onClick={navigateTo.historialMedico} className="action-card">
            <div className="action-icon purple">
              <FileText className="icon" />
            </div>
            <h3 className="action-title">Historial</h3>
            <p className="action-subtitle">Médico</p>
          </button>
        </div>

        <div className="content-grid">
          {/* COLUMNA IZQUIERDA */}
          <div className="left-column">
            {/* PRÓXIMA CITA */}
            <ProximaCita />
            
            {/* CLÍNICAS Y DOCTORES FAVORITOS */}
            <div className="favorites-card">
              <h3 className="card-title">
                <Heart className="title-icon red" />
                Favoritos
              </h3>

              <div className="favorites-list">
                <button
                  onClick={() => navigateTo.clinica("clinica-norte")}
                  className="favorite-item"
                >
                  <div className="favorite-icon teal">
                    <Activity className="icon" />
                  </div>
                  <div className="favorite-info">
                    <h4 className="favorite-name">Clínica Norte</h4>
                    <p className="favorite-description">
                      Medicina General • Especialidades
                    </p>
                  </div>
                  <ChevronRight className="chevron-icon" />
                </button>

                <button
                  onClick={() => navigateTo.doctor("dr-martinez")}
                  className="favorite-item"
                >
                  <div className="favorite-avatar blue">
                    <User className="icon" />
                  </div>
                  <div className="favorite-info">
                    <h4 className="favorite-name">Dr. Carlos Martínez</h4>
                    <p className="favorite-description">Medicina General</p>
                  </div>
                  <ChevronRight className="chevron-icon" />
                </button>

                <button
                  onClick={() => navigateTo.doctor("dra-lopez")}
                  className="favorite-item"
                >
                  <div className="favorite-avatar purple">
                    <User className="icon" />
                  </div>
                  <div className="favorite-info">
                    <h4 className="favorite-name">Dra. Ana López</h4>
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
                <div className="reminder-item amber">
                  <p className="reminder-title">Chequeo anual</p>
                  <p className="reminder-text">Programa tu examen general</p>
                </div>

                <div className="reminder-item blue">
                  <p className="reminder-title">Vacunación</p>
                  <p className="reminder-text">Refuerzo disponible</p>
                </div>

                <div className="reminder-item green">
                  <p className="reminder-title">Resultados listos</p>
                  <p className="reminder-text">2 análisis disponibles</p>
                  <button
                    onClick={navigateTo.resultados}
                    className="reminder-link"
                  >
                    Ver resultados →
                  </button>
                </div>
              </div>
            </div>

            {/* CONTACTO RÁPIDO */}
            <div className="contact-card">
              <h3 className="card-title">Contacto</h3>

              <div className="contact-list">
                <a href="tel:+573001234567" className="contact-item">
                  <div className="contact-icon teal">
                    <Phone className="icon" />
                  </div>
                  <div>
                    <p className="contact-label">Llamar</p>
                    <p className="contact-value">Línea de atención</p>
                  </div>
                </a>

                <a href="mailto:soporte@medilink.com" className="contact-item">
                  <div className="contact-icon blue">
                    <Mail className="icon" />
                  </div>
                  <div>
                    <p className="contact-label">Email</p>
                    <p className="contact-value">Enviar consulta</p>
                  </div>
                </a>
              </div>
            </div>

            {/* NUEVA CLÍNICA */}
            <div className="promo-card">
              <h3 className="promo-title">🎉 Nueva Clínica</h3>
              <p className="promo-text">
                Clínica Vida ahora disponible cerca de ti
              </p>
              <button
                onClick={() => navigateTo.clinica("clinica-vida")}
                className="promo-button"
              >
                Conocer más
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BARRA DE NAVEGACIÓN INFERIOR - SOLO EN MÓVIL */}
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
            onClick={navigateTo.misCitas}
            className={`nav-item ${activeTab === "citas" ? "active" : ""}`}
          >
            <ClipboardList className="nav-icon" />
            <span className="nav-label">Mis Citas</span>
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

export default Inicio;