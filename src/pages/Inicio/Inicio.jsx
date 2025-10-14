import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./inicio.css";
import { 
  FaSearch, FaCog, FaHome, FaCalendarAlt, FaBell, FaUser, 
  FaBaby, FaHeartbeat, FaFemale, FaClinicMedical, FaVideo, FaStar , FaUserNurse
  
} from "react-icons/fa";
import Menu from "../../components/menu/menu.jsx";

export default function Inicio() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");

  return (
    <div className="inicio-container">
      {/* Header */}
      <header className="inicio-header">
        <h1 className="logo">MediLink</h1>
        <div className="header-search-group">
          <input
            type="text"
            className="header-search-input"
            placeholder="Buscar doctor, clínica..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
          <button onClick={() => navigate("/busqueda")} className="icon-btn" title="Buscar">
            <FaSearch size={22} />
          </button>
          <button onClick={() => navigate("/ajustes")} className="icon-btn" title="Ajustes">
            <FaCog size={22} />
          </button>
        </div>
      </header>

      {/* Bienvenida */}
      <section className="bienvenida">
        <h2>¡Hola!</h2>
        <p>Encuentra tu médico ideal y agenda tu consulta :)</p>
      </section>

      {/* Próxima cita */}
      <section className="cita-card">
        <div className="cita-info">
          <p className="cita-label">Próxima Cita</p>
          <h3>Lunes 10:00 AM</h3>
          <p className="cita-doctor">Dra. López - Pediatría</p>
        </div>
        <div className="cita-actions">
          <button
            className="btn-video"
            onClick={() => navigate("/videoconsulta")}
          >
            <FaVideo style={{ marginRight: "6px" }} />
            Video consulta
          </button>
          <span className="cita-status">En 2 días</span>
        </div>
      </section>

      {/* Especialidades */}
      <section className="especialidades">
        <div className="section-header">
          <h3>Especialidades</h3>
          <button onClick={() => navigate("/especialidades")}>Ver más</button>
        </div>
        <div className="especialidades-grid">
          <div className="especialidad" onClick={() => navigate("/pediatria")}>
            <FaBaby className="icon" />
            <p>Pediatría</p>
          </div>
          <div className="especialidad" onClick={() => navigate("/cardiologia")}>
            <FaHeartbeat className="icon" />
            <p>Cardiología</p>
          </div>
          <div className="especialidad" onClick={() => navigate("/dermatologia")}>
            <FaUserNurse className="icon" />
            <p>Dermatología</p>
          </div>
          <div className="especialidad" onClick={() => navigate("/ginecologia")}>
            <FaFemale className="icon" />
            <p>Ginecología</p>
          </div>
        </div>
      </section>

      {/* Doctores destacados */}
      <section className="doctores">
        <div className="section-header">
          <h3>Doctores Destacados</h3>
          <button onClick={() => navigate("/doctores")}>Ver todos</button>
        </div>
        <div className="doctores-grid">
          <div className="doctor-card">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Dra. López" className="doctor-photo"/>
            <p className="doctor-name">Dra. López</p>
            <p className="doctor-specialty">Pediatría ⭐ 4.9</p>
            <button className="btn-agendar" onClick={() => navigate("/agendar")}>
              Agendar
            </button>
            
          </div>

          <div className="doctor-card">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Dr. Martínez" className="doctor-photo"/>
            <p className="doctor-name">Dr. Martínez</p>
            <p className="doctor-specialty">Cardiología ⭐ 4.8</p>
            <button className="btn-agendar" onClick={() => navigate("/agendar")}>
              Agendar
            </button>
          </div>

          <div className="doctor-card">
            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Dra. Ramírez" className="doctor-photo"/>
            <p className="doctor-name">Dra. Ramírez</p>
            <p className="doctor-specialty">Dermatología ⭐ 4.9</p>
            <button className="btn-agendar" onClick={() => navigate("/agendar")}>
              Agendar
            </button>
          </div>
        </div>
      </section>

      {/* Clínicas cercanas */}
      <section className="clinicas">
        <div className="section-header">
          <h3>Clínicas Cercanas</h3>
          <button onClick={() => navigate("/clinicas")}>Ver todas</button>
        </div>
        <div className="clinicas-grid">
          <div className="clinica-card" onClick={() => navigate("/clinicanorte")}>
            <FaClinicMedical className="icon" />
            <p>Clínica Norte</p>
          </div>
          <div className="clinica-card" onClick={() => navigate("/clinicacentral")}>
            <FaClinicMedical className="icon" />
            <p>Clínica Central</p>
          </div>
          <div className="clinica-card" onClick={() => navigate("/clinicavida")}>
            <FaClinicMedical className="icon" />
            <p>Clínica Vida</p>
          </div>
        </div>
      </section>

      {/* Menú inferior */}
      <Menu/>
    </div>
  );
}
