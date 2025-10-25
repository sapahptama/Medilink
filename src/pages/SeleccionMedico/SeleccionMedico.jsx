import React, { useState, useEffect } from "react";
import "./SeleccionMedico.css";
import { MapPin, Stethoscope, ChevronRight, AlertCircle, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_MEDICOS = "https://servidor-medilink.vercel.app/medicos";

export default function SeleccionMedico() {
  const [medicos, setMedicos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [filtroEspecialidad, setFiltroEspecialidad] = useState("");
  const navigate = useNavigate();

  // 🔹 Cargar médicos al montar el componente
  useEffect(() => {
    cargarMedicos();
  }, []);

  const cargarMedicos = async () => {
    try {
      setCargando(true);
      const response = await fetch(API_MEDICOS);
      if (!response.ok) throw new Error("Error al cargar médicos");
      const data = await response.json();

      // ✅ Si el médico no tiene foto, generar avatar automático
      const medicosConFoto = data.map((m) => ({
        ...m,
        foto_perfil:
          m.foto_perfil ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            `${m.nombre} ${m.apellido}`
          )}&background=0d9488&color=fff&size=200`,
      }));

      setMedicos(medicosConFoto);
      setError("");
    } catch (err) {
      console.error("❌ Error:", err);
      setError("Error de conexión al servidor");
    } finally {
      setCargando(false);
    }
  };

  // 🔹 Obtener especialidades únicas
  const especialidades = [
    ...new Set(medicos.map((m) => m.especialidad).filter(Boolean)),
  ];

  // 🔹 Filtrar médicos según especialidad
  const medicosFiltrados = filtroEspecialidad
    ? medicos.filter((m) => m.especialidad === filtroEspecialidad)
    : medicos;

  // 🔹 Estado: cargando
  if (cargando) {
    return (
      <div className="lista-medicos-container">
        <div className="estado-cargando">
          <Loader size={32} className="spinner" />
          <p>Cargando médicos...</p>
        </div>
      </div>
    );
  }

  const handleSeleccionarMedico = (medico) => {
    // Redirigir a DisponibilidadMedico con el ID del médico
    navigate(`/disponibilidad/${medico.id_medico}`);
  };

  // 🔹 Estado: error
  if (error) {
    return (
      <div className="lista-medicos-container">
        <div className="estado-error">
          <AlertCircle size={32} />
          <p>{error}</p>
          <button onClick={cargarMedicos} className="btn-reintentar">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // 🔹 Render principal
  return (
    <div className="lista-medicos-container">
      <header className="header-medicos">
        <div className="header-titulo">
          <Stethoscope size={28} />
          <h1>Nuestros Médicos</h1>
        </div>
        <p className="header-subtitulo">
          Selecciona un médico para ver su disponibilidad
        </p>
      </header>

      {/* 🔸 Filtro de especialidad */}
      <div className="filtro-container">
        <button
          className={`filtro-btn ${!filtroEspecialidad ? "activo" : ""}`}
          onClick={() => setFiltroEspecialidad("")}
        >
          Todos ({medicos.length})
        </button>
        {especialidades.map((esp) => {
          const cantidad = medicos.filter((m) => m.especialidad === esp).length;
          return (
            <button
              key={esp}
              className={`filtro-btn ${
                filtroEspecialidad === esp ? "activo" : ""
              }`}
              onClick={() => setFiltroEspecialidad(esp)}
            >
              {esp} ({cantidad})
            </button>
          );
        })}
      </div>

      {/* 🔸 Grid de médicos */}
      <div className="grid-medicos">
        {medicosFiltrados.length === 0 ? (
          <div className="sin-resultados">
            <p>No hay médicos con esa especialidad</p>
          </div>
        ) : (
          medicosFiltrados.map((medico) => (
            <div key={medico.id_medico} className="tarjeta-medico">
              {/* FOTO */}
              <div className="medico-foto-container">
                <img
                  src={medico.foto_perfil}
                  alt={`${medico.nombre} ${medico.apellido}`}
                  className="medico-foto"
                />
              </div>

              {/* INFO */}
              <div className="medico-info">
                <h3 className="medico-nombre">
                  {medico.nombre} {medico.apellido}
                </h3>

                <div className="medico-especialidad">
                  <Stethoscope size={16} />
                  <span>{medico.especialidad}</span>
                </div>

                {medico.anios_experiencia > 0 && (
                  <p className="medico-experiencia">
                    {medico.anios_experiencia} años de experiencia
                  </p>
                )}

                {medico.tarifa > 0 && (
                  <p className="medico-tarifa">
                    Tarifa: ${medico.tarifa.toLocaleString("es-CO")}
                  </p>
                )}

                {medico.universidad && (
                  <p className="medico-universidad">{medico.universidad}</p>
                )}

                {medico.direccion_consultorio && (
                  <div className="medico-ubicacion">
                    <MapPin size={14} />
                    <span>{medico.direccion_consultorio}</span>
                  </div>
                )}
              </div>

              {/* ACCIONES */}
              <div className="medico-acciones">
                <button
                  className="btn-accion btn-chat"
                  title="Chatear con el médico"
                >
                  💬 Chat
                </button>
                <button
                  className="btn-accion btn-cita"
                  onClick={() => handleSeleccionarMedico(medico)} 
                >
                  Pedir Cita
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
