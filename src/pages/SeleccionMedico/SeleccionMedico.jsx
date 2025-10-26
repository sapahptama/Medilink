import React, { useState, useEffect, useContext } from "react";
import "./SeleccionMedico.css";
import {
  MapPin,
  Stethoscope,
  ChevronRight,
  AlertCircle,
  Loader,
  ArrowLeftCircle,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const API_MEDICOS = "https://servidor-medilink.vercel.app/medicos";

export default function SeleccionMedico() {
  const [medicos, setMedicos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [filtroEspecialidad, setFiltroEspecialidad] = useState("");
  const { usuario } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    cargarMedicos();
  }, []);

  const cargarMedicos = async () => {
    try {
      setCargando(true);
      const response = await fetch(API_MEDICOS);
      if (!response.ok) throw new Error("Error al cargar médicos");
      const data = await response.json();

      const medicosConFoto = data.map((m) => ({
        ...m,
        foto_perfil:
          m.foto_perfil && m.foto_perfil.trim() !== ""
            ? m.foto_perfil
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
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

  const volverInicio = () => {
    if (!usuario) return navigate("/");
    if (usuario.rol === "medico") navigate("/inicio-medico");
    else if (usuario.rol === "paciente") navigate("/inicio-paciente");
    else navigate("/");
  };

  const handleSeleccionarMedico = (medico) => {
    navigate(`/disponibilidad/${medico.id_medico}`);
  };

  const especialidades = [
    ...new Set(medicos.map((m) => m.especialidad).filter(Boolean)),
  ];

  const medicosFiltrados = filtroEspecialidad
    ? medicos.filter((m) => m.especialidad === filtroEspecialidad)
    : medicos;

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

  return (
    <div className="lista-medicos-container">
      <div className="header-flex">
        <button className="btn-volver" onClick={volverInicio}>
          <ArrowLeftCircle size={22} /> Volver
        </button>
        <div className="header-titulo">
          <Stethoscope size={28} />
          <h1>Nuestros Médicos</h1>
        </div>
      </div>

      <p className="header-subtitulo">
        Selecciona un médico para ver su disponibilidad
      </p>

      {/* Filtro de especialidad */}
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

      {/* Lista o mensaje vacío */}
      {medicosFiltrados.length === 0 ? (
        <div className="no-medicos">
          <Users size={64} className="no-medicos-icon" />
          <h3>No se encontraron médicos disponibles</h3>
          <p>
            {filtroEspecialidad
              ? "No hay médicos registrados en esta especialidad."
              : "Aún no hay médicos registrados en el sistema."}
          </p>
          <button onClick={volverInicio} className="btn-volver-inicio">
            <ArrowLeftCircle size={20} /> Volver al inicio
          </button>
        </div>
      ) : (
        <div className="grid-medicos">
          {medicosFiltrados.map((medico) => (
            <div key={medico.id_medico} className="tarjeta-medico">
              <div className="medico-foto-container">
                <img
                  src={medico.foto_perfil}
                  alt={`${medico.nombre} ${medico.apellido}`}
                  className="medico-foto"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      `${medico.nombre} ${medico.apellido}`
                    )}&background=0d9488&color=fff&size=200`;
                  }}
                />
              </div>

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

              <div className="medico-acciones">
                <button
                  className="btn-accion btn-cita"
                  onClick={() => handleSeleccionarMedico(medico)}
                >
                  Pedir Cita <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
