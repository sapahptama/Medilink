import React from "react";
import { FaSearch, FaBell, FaUserMd, FaClinicMedical } from "react-icons/fa";
import "./Inicio.css";

function Inicio() {
  // 🔎 Función ejemplo para el buscador
  const handleBuscar = () => {
    alert("Función de búsqueda (se conecta después)");
  };

  return (
    <div className="inicio-container">
      {/* HEADER FIJO */}
      <header className="inicio-header">
        <h1 className="inicio-logo">MediLink</h1>
        <div className="inicio-icons">
          <button onClick={handleBuscar} title="Buscar">
            <FaSearch />
          </button>
          <button onClick={() => alert("Ir a notificaciones")} title="Notificaciones">
            <FaBell />
          </button>
        </div>
      </header>

      {/* CONTENIDO (con margen superior para que no quede escondido) */}
      <div className="inicio-contenido">
        {/* Barra de búsqueda */}
        <div className="search-bar">
          <input type="text" placeholder="Buscar clínicas o doctores..." />
          <button onClick={handleBuscar}>Buscar</button>
        </div>

        {/* Filtros */}
        <div className="filters">
          <select>
            <option value="">Especialidad</option>
            <option value="general">Medicina General</option>
            <option value="cardiologia">Cardiología</option>
            <option value="odontologia">Odontología</option>
          </select>
          <select>
            <option value="">Ciudad</option>
            <option value="medellin">Medellín</option>
            <option value="bogota">Bogotá</option>
            <option value="cali">Cali</option>
          </select>
        </div>

        {/* Accesos rápidos */}
        <div className="accesos-rapidos">
          <div className="acceso">
            <FaClinicMedical size={30} />
            <p>Clínica Norte</p>
          </div>
          <div className="acceso">
            <FaClinicMedical size={30} />
            <p>Clínica Central</p>
          </div>
          <div className="acceso">
            <FaUserMd size={30} />
            <p>Dra. López</p>
          </div>
          <div className="acceso">
            <FaUserMd size={30} />
            <p>Dr. Martínez</p>
          </div>
        </div>

        {/* Próxima cita */}
        <div className="card">
          <h3>Próxima cita</h3>
          <p>Lun 10:00 a.m. — Dra. López (Clínica Norte)</p>
          <button className="btn-detalles">Ver detalles</button>
        </div>

        {/* Chequeo */}
        <div className="card">
          <h3>Chequeo anual recomendado</h3>
          <p>¡No olvides programar tu chequeo!</p>
        </div>

        {/* Vacunación */}
        <div className="card">
          <h3>Vacunación</h3>
          <p>Vacúnate en tu clínica más cercana</p>
        </div>

        {/* Nueva clínica */}
        <div className="card">
          <h3>Nueva clínica disponible</h3>
          <p>Clínica Vida — Medicina General</p>
          <button className="btn-agendar">Agendar</button>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
